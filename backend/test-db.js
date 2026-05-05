import { pool, connectDB } from "./src/config/db.js";

async function test() {
    await connectDB();
    try {
        const result = await pool.request().query("SELECT TOP 1 * FROM Users");
        console.log("Users Query Success:", result.recordset);
    } catch (err) {
        console.error("Users Query Failed:", err.message);
    }

    try {
        const result = await pool.request().query("SELECT TOP 1 * FROM SINHVIEN");
        console.log("SINHVIEN Query Success:", result.recordset);
    } catch (err) {
        console.error("SINHVIEN Query Failed:", err.message);
    }
    process.exit(0);
}

test();
