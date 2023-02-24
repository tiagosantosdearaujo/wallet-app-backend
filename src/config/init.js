const db = require("../db");
const tableQueries = require("../queries/table");

const init = async () => {
  try {
    await db.connect();
    await db.query(tableQueries.createUsers());
    await db.query(tableQueries.createCategories());
    await db.query(tableQueries.createFinances());
    console.log("Successfully created tables");
    db.end();
    return;
  } catch (error) {
    throw new Error("Error configuring to database", error);
  }
};

init();
