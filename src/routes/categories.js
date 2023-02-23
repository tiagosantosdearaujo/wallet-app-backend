const express = require("express");
const router = express.Router();
const db = require("../db");
const categoriesQueries = require("../queries/categories");

router.get("/", (req, res) => {
  try {
    db.query(
      "SELECT * FROM categories ORDER BY name ASC",
      (error, response) => {
        if (error) {
          return res.status(500).json(error);
        }

        return res.status(200).json(response.rows);
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/", (req, res) => {
  try {
    const { name } = req.body;

    if (name.lenght < 3) {
      return res
        .status(400)
        .json({ error: "Name should have more than 3 characters" });
    }

    const text = "INSERT INTO categories(name) VALUES($1) RETURNING *";
    const values = [name];

    db.query(text, values, (error, response) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(response.rows);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Id is mandatory" });
    }
    const query = categoriesQueries.findById(id);
    const category = await db.query(query);

    if (!category.rows[0]) {
      return res.status(404).json({ error: "Category not found" });
    }

    const text = "DELETE FROM categories WHERE id=$1 RETURNING *";
    const values = [Number(id)];
    const deleteResponse = await db.query(text, values);

    if (!deleteResponse.rows[0]) {
      return res.status(400).json({ error: "Category not deleted" });
    }

    return res.status(200).json(deleteResponse.rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Id is mandatory" });
    }
    if (name.lenght < 3) {
      return res
        .status(400)
        .json({ error: "Name should have more than 3 characters" });
    }

    const query = categoriesQueries.findById(id);
    const category = await db.query(query);

    if (!category.rows[0]) {
      return res.status(404).json({ error: "Category not found" });
    }

    const text = "UPDATE categories SET name=$1 WHERE id=$2 RETURNING *";
    const values = [name, Number(id)];
    const updateResponse = await db.query(text, values);

    if (!updateResponse.rows[0]) {
      return res.status(400).json({ error: "Category not updated" });
    }

    return res.status(200).json(updateResponse.rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
