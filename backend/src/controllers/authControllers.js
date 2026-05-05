import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { pool } from "../config/db.js";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL_MS = 14 * 24 * 60 * 60 * 1000;

const authMiddleware = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  const checkBearer = "Bearer ";

  if (token) {
    if (token.startsWith(checkBearer)) {
      token = token.slice(checkBearer.length);
    }
    
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded; // Attach userId
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "No token provided.",
    });
  }
};

export default authMiddleware;

export const signIn = async (req, res) => {
  try {
    //lấy inputs
    const msv = req.body.msv || req.body.MASV;
    const password = req.body.password || req.body.Password;

    if (!msv || !password) {
      return res.status(400).json({ message: "Thiếu msv hoặc password." });
    }

    //lấy user từ db theo msv
    console.log("signIn request", { msv, password });
    const result = await pool
      .request()
      .input("msv", msv)
      .query("SELECT * FROM Users WHERE MASV = @msv");
    const user = result.recordset[0];
    console.log(
      "signIn user",
      user && {
        UserID: user.UserID,
        MASV: user.MASV,
        HASH_PASSWORD: user.HASH_PASSWORD,
      },
    );
    if (!user) {
      return res
        .status(401)
        .json({ message: "msv hoặc password không chính xác" });
    }

    //kiểm tra password
    const storedPassword = user.HASH_PASSWORD || user.hash_password;
    console.log("signIn password in db", storedPassword);

    // MVP: So sánh trực tiếp văn bản gốc
    if (password !== storedPassword) {
      return res
        .status(401)
        .json({ message: "msv hoặc mật khẩu không chính xác" });
    }

    //nếu khớp tạo accessToken với JWT
    const accessToken = jwt.sign(
      { userId: user.UserID },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    // tạo refresh token và lưu SESSION như flow gốc
    const refreshToken = crypto.randomBytes(64).toString("hex");
    try {
      await pool
        .request()
        .input("UserID", user.UserID)
        .input("RefreshToken", refreshToken)
        .input("ExpiredAt", new Date(Date.now() + REFRESH_TOKEN_TTL_MS))
        .query(
          "INSERT INTO SESSION (UserID, RefreshToken, ExpiredAt) VALUES (@UserID, @RefreshToken, @ExpiredAt)",
        );
    } catch (sessionErr) {
      console.warn(
        "Không thể lưu SESSION (có thể table không tồn tại)",
        sessionErr,
      );
    }

    // trả refresh token về cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TTL_MS,
    });

    // trả access token về trong res
    return res.status(200).json({
      message: `User ${user.MASV} đã đăng nhập thành công!`,
      accessToken,
    });
  } catch (error) {
    console.error("Lỗi khi gọi signIn", error);
    return res.status(500).json({ message: `Lỗi hệ thống: ${error.message}` });
  }
};

export const signOut = async (req, res) => {
  try {
    //lấy refresh token từ cookie
    const token = req.cookies?.refreshToken;

    if (token) {
      //xoá token trong session
      await pool
        .request()
        .input("refreshToken", token)
        .query("DELETE FROM SESSION WHERE RefreshToken = @refreshToken");

      // xoá cookie
      res.clearCookie("refreshToken");
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi signOut", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { msv, email } = req.body;

    if (!msv || !email) {
      return res.status(400).json({ message: "Vui lòng cung cấp mã sinh viên và email." });
    }

    // Kiểm tra xem MASV và Email có khớp trong database không
    const query = `
      SELECT u.UserID, s.EMAIL 
      FROM Users u
      INNER JOIN SINHVIEN s ON u.MASV = s.MASV
      WHERE u.MASV = @msv AND s.EMAIL = @email
    `;

    const result = await pool
      .request()
      .input("msv", msv)
      .input("email", email)
      .query(query);

    const user = result.recordset[0];

    if (!user) {
      return res.status(404).json({ message: "Thông tin mã sinh viên hoặc email không chính xác." });
    }

    // Tạo mật khẩu mới ngẫu nhiên (8 ký tự)
    const newPassword = Math.random().toString(36).slice(-8);

    // Cập nhật mật khẩu mới vào database (Lưu ý: Đang dùng plain text theo logic hiện tại của dự án)
    await pool
      .request()
      .input("userId", user.UserID)
      .input("newPassword", newPassword)
      .query("UPDATE Users SET HASH_PASSWORD = @newPassword WHERE UserID = @userId");

    // Trong thực tế sẽ gửi email ở đây. Hiện tại chúng ta giả lập bằng cách trả về mật khẩu mới.
    console.log(`[Forgot Password] New password for ${msv}: ${newPassword}`);

    return res.status(200).json({
      message: "Mật khẩu mới đã được gửi tới email của bạn.",
      tempPassword: newPassword // Trả về để frontend có thể hiển thị cho demo
    });
  } catch (error) {
    console.error("Lỗi khi quên mật khẩu:", error);
    return res.status(500).json({ message: "Lỗi hệ thống: " + error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, otp } = req.body;
    const userId = req.user.userId;

    if (!oldPassword || !newPassword || !otp) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin và mã xác thực." });
    }

    const userResult = await pool
      .request()
      .input("userId", userId)
      .query("SELECT HASH_PASSWORD FROM Users WHERE UserID = @userId");
    
    const user = userResult.recordset[0];
    if (!user || user.HASH_PASSWORD !== oldPassword) {
      return res.status(401).json({ message: "Mật khẩu cũ không chính xác." });
    }

    if (otp !== "123456") {
      return res.status(400).json({ message: "Mã xác thực không chính xác." });
    }

    await pool
      .request()
      .input("userId", userId)
      .input("newPassword", newPassword)
      .query("UPDATE Users SET HASH_PASSWORD = @newPassword WHERE UserID = @userId");

    return res.status(200).json({ message: "Đổi mật khẩu thành công!" });
  } catch (error) {
    console.error("Lỗi khi đổi mật khẩu:", error);
    return res.status(500).json({ message: "Lỗi hệ thống: " + error.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    return res.status(200).json({ message: "Mã xác thực đã được gửi về email của bạn. (Demo: 123456)" });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
