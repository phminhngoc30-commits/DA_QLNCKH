import { pool } from "../config/db.js";

export const addFavourite = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    if (!id) {
      return res.status(400).json({ message: "Thiếu ID công trình" });
    }

    const checkProject = await pool
      .request()
      .input("id", id)
      .query("SELECT MACONGTRINH FROM CONGTRINHNC WHERE MACONGTRINH = @id");

    if (!checkProject.recordset.length) {
      return res
        .status(404)
        .json({ message: "Công trình nghiên cứu không tồn tại" });
    }

    const checkFavourite = await pool
      .request()
      .input("userId", userId)
      .input("id", id)
      .query(
        "SELECT COUNT(*) AS total FROM YEUTHICH WHERE UserID = @userId AND MACONGTRINH = @id",
      );

    if (checkFavourite.recordset[0].total > 0) {
      return res
        .status(200)
        .json({ message: "Công trình đã được lưu vào yêu thích" });
    }

    await pool
      .request()
      .input("userId", userId)
      .input("id", id)
      .query(
        "INSERT INTO YEUTHICH (UserID, MACONGTRINH) VALUES (@userId, @id)",
      );

    return res.status(200).json({ message: "Lưu yêu thích thành công" });
  } catch (error) {
    console.error("Lỗi khi thêm yêu thích", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const removeFavourite = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    if (!id) {
      return res.status(400).json({ message: "Thiếu ID công trình" });
    }

    const deleteResult = await pool
      .request()
      .input("userId", userId)
      .input("id", id)
      .query(
        "DELETE FROM YEUTHICH WHERE UserID = @userId AND MACONGTRINH = @id",
      );

    if (deleteResult.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: "Công trình chưa được lưu yêu thích" });
    }

    return res.status(200).json({ message: "Bỏ yêu thích thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa yêu thích", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getFavouriteList = async (req, res) => {
  try {
    const { userId } = req.user;
    
    const query = `
      SELECT c.MACONGTRINH, c.TENCONGTRINH, c.TGBATDAU, c.TGKETTHUC, c.FILEHOSOKEMTHEO, l.TENLINHVUC, g.TENGVHD as TenGVHD
      FROM YEUTHICH y
      JOIN CONGTRINHNC c ON y.MACONGTRINH = c.MACONGTRINH
      LEFT JOIN LINHVUC l ON c.MALINHVUC = l.MALINHVUC
      LEFT JOIN NHOM n ON c.MANHOM = n.MANHOM
      LEFT JOIN GVHD g ON n.MAGVHD = g.MAGVHD
      WHERE y.UserID = @userId
    `;
    
    const result = await pool.request().input("userId", userId).query(query);
    return res.status(200).json({ data: result.recordset });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu thích", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
