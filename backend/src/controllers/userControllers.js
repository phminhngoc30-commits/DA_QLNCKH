import { pool } from "../config/db.js";

export const authMe = async (req, res) => {
  try {
    const { userId } = req.user;

    console.log("authMe userId", userId);

    // query user từ DB để lấy MASV
    const result = await pool
      .request()
      .input("userId", userId)
      .query("SELECT UserID, MASV FROM Users WHERE UserID = @userId");
    const user = result.recordset[0];

    console.log("authMe user from DB", user);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    return res.status(200).json({
      message: "user",
      user: { userId: user.UserID, MASV: user.MASV },
    });
  } catch (error) {
    console.error("Lỗi khi gọi authMe", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name, email, dob, sdt, gioitinh, malop, dantoc } = req.body;

    // 1. Get MASV from Users table
    const userResult = await pool
      .request()
      .input("userId", userId)
      .query("SELECT MASV FROM Users WHERE UserID = @userId");
    
    if (userResult.recordset.length === 0) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    
    const masv = userResult.recordset[0].MASV;

    // 2. Update SINHVIEN table
    const updateRequest = pool.request();
    updateRequest.input("masv", masv);
    updateRequest.input("name", name);
    updateRequest.input("email", email);
    updateRequest.input("dob", dob ? new Date(dob) : null);
    updateRequest.input("sdt", sdt);
    updateRequest.input("gioitinh", gioitinh);
    updateRequest.input("malop", malop);
    updateRequest.input("dantoc", dantoc);

    await updateRequest.query(`
      UPDATE SINHVIEN 
      SET HOTEN = @name, 
          EMAIL = @email, 
          DOB = @dob, 
          SDT = @sdt, 
          GIOITINH = @gioitinh, 
          MALOP = @malop, 
          DANTOC = @dantoc
      WHERE MASV = @masv
    `);

    return res.status(200).json({ message: "Cập nhật thông tin thành công!" });
  } catch (error) {
    console.error("Lỗi khi cập nhật profile:", error);
    return res.status(500).json({ message: "Lỗi hệ thống: " + error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    // 1. Get MASV from Users table
    const userResult = await pool
      .request()
      .input("userId", userId)
      .query("SELECT MASV FROM Users WHERE UserID = @userId");
    
    if (userResult.recordset.length === 0) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    
    const masv = userResult.recordset[0].MASV;

    // 2. Fetch from SINHVIEN with Department info
    const profileResult = await pool
      .request()
      .input("masv", masv)
      .query(`
        SELECT s.*, k.TENKHOA 
        FROM SINHVIEN s
        LEFT JOIN LOP l ON s.MALOP = l.MALOP
        LEFT JOIN KHOA k ON l.MAKHOA = k.MAKHOA
        WHERE s.MASV = @masv
      `);
    
    if (profileResult.recordset.length === 0) {
      return res.status(404).json({ message: "Thông tin sinh viên không tồn tại" });
    }

    return res.status(200).json({
      message: "profile",
      profile: profileResult.recordset[0]
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin profile:", error);
    return res.status(500).json({ message: "Lỗi hệ thống: " + error.message });
  }
};

export const searchUserByMSV = async (req, res) => {
  try {
    const { msv } = req.params;

    const result = await pool
      .request()
      .input("msv", msv)
      .query(`
        SELECT s.MASV, s.HOTEN, s.MALOP, k.TENKHOA 
        FROM SINHVIEN s
        LEFT JOIN LOP l ON s.MALOP = l.MALOP
        LEFT JOIN KHOA k ON l.MAKHOA = k.MAKHOA
        WHERE s.MASV = @msv
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sinh viên" });
    }

    return res.status(200).json({
      student: result.recordset[0]
    });
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sinh viên:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
