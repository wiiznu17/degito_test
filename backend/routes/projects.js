const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/projects
// Returns all projects with their client name.
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.status,
        p.client_id,
        c.name AS client_name,
        n.id AS note_id
      FROM projects p
      JOIN clients c ON c.id = p.client_id
      LEFT JOIN project_notes n ON n.project_id = p.id
      ORDER BY p.id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST /api/projects
// Creates a new project.
router.post("/", async (req, res) => {
  try {
    const { name, client_id, status } = req.body;

    const result = await pool.query(
      `INSERT INTO projects (name, client_id, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, client_id, status || "planning"]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// PATCH /api/projects/:id/status
// Updates a project's status.
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE projects SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update project" });
  }
});

module.exports = router;
