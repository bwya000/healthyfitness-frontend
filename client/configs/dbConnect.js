import mysql from "mysql2/promise";

const dbConnect = async () => {
  if (global.connection && global.connection.state !== "disconnected") return;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  global.connection = connection; //把資料庫連接,用golbal設成全域屬性
};

export default dbConnect;