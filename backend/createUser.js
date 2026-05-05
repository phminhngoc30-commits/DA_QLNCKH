import bcrypt from "bcrypt";
import { pool } from "./src/config/db.js";

async function createTestUser() {
  // Lấy MASV đầu tiên từ SINHVIEN
  await pool.connect();
  const sinhvienResult = await pool
    .request()
    .query("SELECT TOP 1 MASV FROM SINHVIEN");
  if (sinhvienResult.recordset.length === 0) {
    console.log("Không có MASV trong SINHVIEN");
    return;
  }
  const masv = sinhvienResult.recordset[0].MASV;

  const hashedPassword = await bcrypt.hash("password123", 10);
  await pool
    .request()
    .input("UserID", "1")
    .input("MASV", masv)
    .input("HASH_PASSWORD", hashedPassword)
    .query(
      "INSERT INTO Users (UserID, MASV, HASH_PASSWORD) VALUES (@UserID, @MASV, @HASH_PASSWORD)",
    );
  console.log(`User created with MASV: ${masv}, password: password123`);
}

createTestUser().catch(console.error);

createTestUser().catch(console.error);
