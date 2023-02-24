require("dotenv").config();
const { Pool } = require("pg");

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DB_URL } = process.env;

const db = new Pool(
  DB_URL
    ? {
        connectionString: DB_URL,
      }
    : {
        user: DB_USER,
        host: DB_HOST,
        database: DB_NAME,
        password: DB_PASSWORD,
        port: Number(DB_PORT),
      }
);

module.exports = db;
