const { pool } = require('../backend/src/config/db.js');

async function testSearch() {
  try {
    await pool.connect();
    const request = pool.request();
    
    // Test parameters similar to what frontend might send
    const keyword = null;
    const author = null;
    const year = null;
    const department = null;
    const field = null;
    const isRandom = 'true';
    const offset = 0;
    const limit = 5;

    request.input("keyword", keyword || null);
    request.input("author", author || null);
    request.input("year", year ? parseInt(year) : null);
    request.input("department", department || null);
    request.input("field", field || null);
    request.input("offset", offset);
    request.input("limit", parseInt(limit));

    const whereConditions = [];
    if (keyword) whereConditions.push("(c.TENCONGTRINH LIKE '%' + @keyword + '%')");
    if (author) whereConditions.push("(g.TENGVHD LIKE '%' + @author + '%' OR s.HOTEN LIKE '%' + @author + '%')");
    if (year && year !== "") whereConditions.push("(YEAR(c.TGBATDAU) = @year)");
    if (field) whereConditions.push("(c.MALINHVUC = @field OR l.TENLINHVUC LIKE '%' + @field + '%')");
    if (department) whereConditions.push("(kg.MAKHOA = @department OR ks.MAKHOA = @department OR kg.TENKHOA LIKE '%' + @department + '%' OR ks.TENKHOA LIKE '%' + @department + '%')");

    const whereClause = whereConditions.length > 0 ? "WHERE " + whereConditions.join(" AND ") : "";

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
      LEFT JOIN KHOA ks ON s.MALOP = ks.MALOP
      ${isRandom === 'true' ? '' : whereClause}
      GROUP BY c.MACONGTRINH, c.TENCONGTRINH, c.TGBATDAU, c.TGKETTHUC, c.FILEHOSOKEMTHEO, l.TENLINHVUC, g.TENGVHD, n.MANHOM
      ORDER BY ${isRandom === 'true' ? 'NEWID()' : 'c.MACONGTRINH DESC'}
      OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
    `;

    console.log("Running Query...");
    const result = await request.query(dataQuery);
    console.log("Success! Found records:", result.recordset.length);
    process.exit(0);
  } catch (err) {
    console.error("SQL ERROR DETECTED:");
    console.error(err.message);
    process.exit(1);
  }
}

testSearch();
