//import dữ liệu từ db
import { pool } from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//query parameter: search, page, limit, orderBy, sort

export const search = async (req, res) => {
  try {
    const {
      keyword,
      author,
      year,
      page = 1,
      limit = 10,
      orderBy = "MACONGTRINH",
      sort = "DESC",
      department, // MAKHOA
      field, // MALINHVUC
      isRandom, // New parameter for Top Search
    } = req.query;

    // Validate inputs
    const validOrderBy = ["MACONGTRINH", "TENCONGTRINH", "TGBATDAU"];
    if (!validOrderBy.includes(orderBy)) {
      return res.status(400).json({ message: "Tham số orderBy không hợp lệ" });
    }
    const validSort = ["ASC", "DESC"];
    if (!validSort.includes(sort.toUpperCase())) {
      return res.status(400).json({ message: "Tham số sort không hợp lệ" });
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    // SQL conditions logic
    const whereConditions = [];
    if (keyword) whereConditions.push("(c.TENCONGTRINH LIKE '%' + @keyword + '%')");
    if (author) whereConditions.push("(g.TENGVHD LIKE '%' + @author + '%' OR s.HOTEN LIKE '%' + @author + '%')");
    if (year && year !== "") whereConditions.push("(YEAR(c.TGBATDAU) = @year)");
    if (field) whereConditions.push("(c.MALINHVUC = @field OR l.TENLINHVUC LIKE '%' + @field + '%')");
    if (department) whereConditions.push("(kg.MAKHOA = @department OR ks.MAKHOA = @department OR kg.TENKHOA LIKE '%' + @department + '%' OR ks.TENKHOA LIKE '%' + @department + '%')");

    const whereClause = whereConditions.length > 0 ? "WHERE " + whereConditions.join(" AND ") : "";

    // Query for data
    const dataQuery = `
      SELECT c.MACONGTRINH, c.TENCONGTRINH, c.TGBATDAU, c.TGKETTHUC, c.FILEHOSOKEMTHEO, l.TENLINHVUC, g.TENGVHD as TenGVHD, 
             STUFF((SELECT ', ' + s2.HOTEN 
                    FROM SINHVIEN s2 
                    INNER JOIN SINHVIEN_NHOM sn2 ON s2.MASV = sn2.MASV 
                    WHERE sn2.MANHOM = n.MANHOM 
                    FOR XML PATH('')), 1, 2, '') as TenSinhVien
      FROM CONGTRINHNC c
      LEFT JOIN LINHVUC l ON c.MALINHVUC = l.MALINHVUC
      LEFT JOIN NHOM n ON c.MANHOM = n.MANHOM
      LEFT JOIN GVHD g ON n.MAGVHD = g.MAGVHD
      LEFT JOIN KHOA kg ON g.MAKHOA = kg.MAKHOA
      LEFT JOIN SINHVIEN_NHOM sn ON n.MANHOM = sn.MANHOM
      LEFT JOIN SINHVIEN s ON sn.MASV = s.MASV
      LEFT JOIN LOP ls ON s.MALOP = ls.MALOP
      LEFT JOIN KHOA ks ON ls.MAKHOA = ks.MAKHOA
      ${isRandom === 'true' ? '' : whereClause}
      GROUP BY c.MACONGTRINH, c.TENCONGTRINH, c.TGBATDAU, c.TGKETTHUC, c.FILEHOSOKEMTHEO, l.TENLINHVUC, g.TENGVHD, n.MANHOM
      ORDER BY ${isRandom === 'true' ? 'NEWID()' : `c.${orderBy} ${sort}`}
      OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
    `;

    // Query for total count
    const countQuery = `
      SELECT COUNT(DISTINCT c.MACONGTRINH) as total
      FROM CONGTRINHNC c
      LEFT JOIN LINHVUC l ON c.MALINHVUC = l.MALINHVUC
      LEFT JOIN NHOM n ON c.MANHOM = n.MANHOM
      LEFT JOIN GVHD g ON n.MAGVHD = g.MAGVHD
      LEFT JOIN KHOA kg ON g.MAKHOA = kg.MAKHOA
      LEFT JOIN SINHVIEN_NHOM sn ON n.MANHOM = sn.MANHOM
      LEFT JOIN SINHVIEN s ON sn.MASV = s.MASV
      LEFT JOIN LOP ls ON s.MALOP = ls.MALOP
      LEFT JOIN KHOA ks ON ls.MAKHOA = ks.MAKHOA
      ${isRandom === 'true' ? '' : whereClause}
    `;

    const request = pool.request();
    request.input("keyword", keyword || null);
    request.input("author", author || null);
    request.input("year", year ? parseInt(year) : null);
    request.input("department", department || null);
    request.input("field", field || null);
    request.input("offset", offset);
    request.input("limit", parseInt(limit));

    const [dataResult, countResult] = await Promise.all([
      request.query(dataQuery),
      request.query(countQuery),
    ]);

    const projects = dataResult.recordset;
    const total = countResult.recordset[0].total;

    return res.status(200).json({
      message: "Tìm kiếm thành công",
      data: projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Lỗi khi search", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const viewdetail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Thiếu ID công trình" });
    }

    const query = `
      SELECT c.MACONGTRINH, c.TENCONGTRINH, c.TGBATDAU, c.TGKETTHUC, c.FILEHOSOKEMTHEO, l.TENLINHVUC, g.TENGVHD as TenGVHD, n.SOTHANHVIEN,
             STUFF((SELECT ', ' + s2.HOTEN 
                    FROM SINHVIEN s2 
                    INNER JOIN SINHVIEN_NHOM sn2 ON s2.MASV = sn2.MASV 
                    WHERE sn2.MANHOM = n.MANHOM 
                    FOR XML PATH('')), 1, 2, '') as TenSinhVien
      FROM CONGTRINHNC c
      LEFT JOIN LINHVUC l ON c.MALINHVUC = l.MALINHVUC
      LEFT JOIN NHOM n ON c.MANHOM = n.MANHOM
      LEFT JOIN GVHD g ON n.MAGVHD = g.MAGVHD
      WHERE c.MACONGTRINH = @id
    `;

    const request = pool.request();
    request.input("id", id);

    const result = await request.query(query);
    const project = result.recordset[0];

    if (!project) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy công trình nghiên cứu" });
    }

    return res.status(200).json({
      message: "Lấy chi tiết công trình thành công",
      data: project,
    });
  } catch (error) {
    console.error("Lỗi khi xem chi tiết", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const read = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Thiếu ID công trình" });
    }

    // Query để lấy tên file PDF
    const query = `SELECT FILEHOSOKEMTHEO FROM CONGTRINHNC WHERE MACONGTRINH = @id`;

    const request = pool.request();
    request.input("id", id);

    const result = await request.query(query);
    const project = result.recordset[0];

    if (!project || !project.FILEHOSOKEMTHEO) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy file PDF cho công trình này" });
    }

    const fileName = project.FILEHOSOKEMTHEO;
    const filePath = path.join(__dirname, "..", "uploads", fileName); // Giả sử file trong backend/uploads/

    // Kiểm tra file tồn tại
    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ message: "File PDF không tồn tại trên server" });
    }

    // Gửi file PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`); // Inline để đọc, không download
    res.sendFile(filePath);
  } catch (error) {
    console.error("Lỗi khi đọc bài NCKH", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
