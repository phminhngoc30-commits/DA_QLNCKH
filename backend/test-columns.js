import { pool, connectDB } from "./src/config/db.js";

async function test() {
    await connectDB();
    try {
        const result1 = await pool.request().query("sp_columns NHOM");
        console.log("NHOM:", result1.recordset.map(r => r.COLUMN_NAME).join(', '));
        const result2 = await pool.request().query("sp_columns SINHVIEN");
        console.log("SINHVIEN:", result2.recordset.map(r => r.COLUMN_NAME).join(', '));
        const result3 = await pool.request().query("sp_columns SINHVIEN_NHOM");
        console.log("SINHVIEN_NHOM:", result3.recordset.map(r => r.COLUMN_NAME).join(', '));
        const result4 = await pool.request().query("sp_columns CONGTRINHNC");
        console.log("CONGTRINHNC:", result4.recordset.map(r => r.COLUMN_NAME).join(', '));
    } catch (err) {
        console.error("Query Failed:", err.message);
    }
    process.exit(0);
}

test();
