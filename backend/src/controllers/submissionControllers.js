import { pool } from "../config/db.js";

export const submitProject = async (req, res) => {
    let { title, abstract, field, mentor, groupCode, startDate, endDate, members, files } = req.body;
    const { userId } = req.user;

    // Handle FormData parsing
    if (typeof members === 'string') members = JSON.parse(members);

    try {
        const userResult = await pool.request()
            .input("userId", userId)
            .query("SELECT MASV FROM Users WHERE UserID = @userId");
        if (userResult.recordset.length === 0) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        const masv = userResult.recordset[0].MASV;

        // Check if already submitted
        const existingProject = await pool.request()
            .input("masv", masv)
            .query(`
                SELECT TOP 1 C.MACONGTRINH 
                FROM SINHVIEN_NHOM SN
                JOIN CONGTRINHNC C ON SN.MANHOM = C.MANHOM
                WHERE SN.MASV = @masv
            `);
        
        if (existingProject.recordset.length > 0) {
            return res.status(400).json({ message: "Bạn đã nộp đề tài NCKH." });
        }

        const projectId = "CT" + Date.now().toString().slice(-8);
        const fileName = req.file ? req.file.filename : (files && files.length > 0 ? files[0] : projectId + '_hosonckh.pdf');

        // 1. Sync Group
        const checkGroup = await pool.request()
            .input("groupCode", groupCode)
            .query("SELECT MANHOM FROM NHOM WHERE MANHOM = @groupCode");

        if (checkGroup.recordset.length === 0) {
            await pool.request()
                .input("groupCode", groupCode)
                .input("memberCount", members ? members.length : 1)
                .input("mentorName", mentor)
                .query(`
                    DECLARE @TargetGV varchar(10);
                    SELECT TOP 1 @TargetGV = MAGVHD FROM GVHD WHERE TENGVHD LIKE '%' + @mentorName + '%';
                    IF @TargetGV IS NULL SELECT TOP 1 @TargetGV = MAGVHD FROM GVHD;
                    INSERT INTO NHOM (MANHOM, SOTHANHVIEN, MAGVHD) VALUES (@groupCode, @memberCount, @TargetGV)
                `);
        }

        // 2. Sync Members
        if (members && members.length > 0) {
            await pool.request().input("groupCode", groupCode).query("DELETE FROM SINHVIEN_NHOM WHERE MANHOM = @groupCode");
            for (const m of members) {
                await pool.request()
                    .input("groupCode", groupCode)
                    .input("masv", m.studentId)
                    .input("vaitro", m.studentId === masv ? "Nhóm trưởng" : "Thành viên")
                    .query("IF EXISTS(SELECT 1 FROM SINHVIEN WHERE MASV = @masv) INSERT INTO SINHVIEN_NHOM (MANHOM, MASV, VAITRO) VALUES (@groupCode, @masv, @vaitro)");
            }
        }
        
        // Ensure user is in group
        await pool.request()
            .input("groupCode", groupCode)
            .input("masv", masv)
            .query("IF NOT EXISTS(SELECT 1 FROM SINHVIEN_NHOM WHERE MANHOM = @groupCode AND MASV = @masv) INSERT INTO SINHVIEN_NHOM (MANHOM, MASV, VAITRO) VALUES (@groupCode, @masv, N'Nhóm trưởng')");

        // 3. Create Project
        await pool.request()
            .input("projectId", projectId)
            .input("title", title)
            .input("startDate", startDate ? `${startDate}-01` : null)
            .input("endDate", endDate ? `${endDate}-01` : null)
            .input("groupCode", groupCode)
            .input("fieldName", field)
            .input("fileName", fileName)
            .query(`
                INSERT INTO CONGTRINHNC (MACONGTRINH, TENCONGTRINH, TGBATDAU, TGKETTHUC, MANHOM, MALINHVUC, FILEHOSOKEMTHEO)
                VALUES (@projectId, @title, @startDate, @endDate, @groupCode, 
                       (SELECT TOP 1 MALINHVUC FROM LINHVUC WHERE TENLINHVUC = @fieldName OR MALINHVUC = 'LV01'),
                       @fileName)
            `);

        return res.status(201).json({ message: "Thành công", data: { projectId } });
    } catch (error) {
        console.error("Submit error:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const getSubmissionStatus = async (req, res) => {
    try {
        const { userId } = req.user;
        
        // 1. Get MASV
        const userRes = await pool.request().input("uid", userId).query("SELECT MASV FROM Users WHERE UserID = @uid");
        if (userRes.recordset.length === 0) return res.json({ hasSubmitted: false });
        const masv = userRes.recordset[0].MASV.trim();

        // 2. Find any project where this student is a member
        const statusQuery = `
            SELECT TOP 1 C.MACONGTRINH as projectId, C.TENCONGTRINH as title, C.TGBATDAU as startDate, 
                         C.TGKETTHUC as endDate, C.MANHOM as groupCode, C.FILEHOSOKEMTHEO as fileName,
                         L.TENLINHVUC as fieldName, G.TENGVHD as mentorName, K.TENKHOA as department
            FROM SINHVIEN_NHOM SN
            JOIN CONGTRINHNC C ON SN.MANHOM = C.MANHOM
            LEFT JOIN LINHVUC L ON C.MALINHVUC = L.MALINHVUC
            LEFT JOIN NHOM N ON C.MANHOM = N.MANHOM
            LEFT JOIN GVHD G ON N.MAGVHD = G.MAGVHD
            LEFT JOIN KHOA K ON G.MAKHOA = K.MAKHOA
            WHERE SN.MASV = @masv OR SN.MASV LIKE '%' + @masv + '%'
            ORDER BY C.TGBATDAU DESC
        `;
        
        const result = await pool.request().input("masv", masv).query(statusQuery);

        if (result.recordset.length === 0) {
            return res.status(200).json({ hasSubmitted: false });
        }

        const project = result.recordset[0];

        // 3. Get members
        const members = await pool.request().input("group", project.groupCode).query(`
            SELECT S.MASV as studentId, S.HOTEN as name, S.MALOP as class, SN.VAITRO as role
            FROM SINHVIEN_NHOM SN
            JOIN SINHVIEN S ON SN.MASV = S.MASV
            WHERE SN.MANHOM = @group
        `);

        return res.json({
            hasSubmitted: true,
            project: {
                ...project,
                abstract: "", // Column missing in DB
                members: members.recordset
            }
        });
    } catch (error) {
        console.error("Status error:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const saveDraft = async (req, res) => res.json({ message: "OK" });
export const updateProject = async (req, res) => res.json({ message: "OK" });
export const deleteProject = async (req, res) => res.json({ message: "OK" });
