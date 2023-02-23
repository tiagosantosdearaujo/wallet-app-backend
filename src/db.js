const { Pool } = require("pg");

const db = new Pool({
  user: "docker",
  host: "localhost",
  database: "finances",
  password: "docker",
  port: 5432,
});

module.exports = db;
