const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/clients
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM clients ORDER BY id ASC`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

module.exports = router;
