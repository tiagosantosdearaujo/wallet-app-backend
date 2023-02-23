const { response } = require("express");
const express = require("express");
const db = require("./db");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (error, response) => {
    if (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json(response.rows);
  });
});

app.listen(port, () => {
  db.connect()
    .then(() => {
      console.log("data base connected ");
    })
    .catch((error) => {
      throw new Error(error);
    });
  console.log(`Example app listening on port ${port}`);
});
