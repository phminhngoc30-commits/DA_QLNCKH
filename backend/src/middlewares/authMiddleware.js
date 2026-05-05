import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

//authorization - xác minh user là ai
export const protectedRoute = (req, res, next) => {
  try {
    //lấy token từ header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //Bearer <token>

    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy access token" });
    }
    //xác nhận token hợp lệ
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedUser) => {
        if (err) {
          console.error(err);
          return res
            .status(403)
            .json({ message: "Access hết hạn hoặc không đúng" });
        }
        //tìm user
        console.log("protectedRoute userId", decodedUser.userId);
        // tạm bỏ query DB để demo, chỉ set req.user = decodedUser
        req.user = decodedUser;
        next();
      },
    );
  } catch (error) {
    console.error("Lỗi khi xác minh JWT trong authMiddleware", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
