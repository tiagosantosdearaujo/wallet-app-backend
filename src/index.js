require("dotenv").config;
const express = require("express");
const cors = require("cors");
const db = require("./db");
const routesCategories = require("./routes/categories");
const routesUsers = require("./routes/users");
const routesFinances = require("./routes/finances");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const port = process.env.PORT;

app.use("/categories", routesCategories);
app.use("/users", routesUsers);
app.use("/finances", routesFinances);

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
