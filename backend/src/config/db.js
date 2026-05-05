import mssql from "mssql";

const SQL_DRIVER = "SQL Server";
const SQL_SERVER = "Admin";
const SQL_DATABASE = "QLNCKH";
const SQL_UID = "sa";
const SQL_PWD = "cavoihoangde";

const config = {
  server: SQL_SERVER,
  database: SQL_DATABASE,
  user: SQL_UID,
  password: SQL_PWD,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: false,
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
  pool: {
    idleTimeoutMillis: 30000,
    max: 100,
  },
};

export const pool = new mssql.ConnectionPool(config);
export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Kết nối SQL Server thành công!");
  } catch (err) {
    console.error("Kết nối thất bại:", err.message);
    process.exit(1);
  }
};

export { mssql };
