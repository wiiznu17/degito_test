const express = require("express");
const pool = require("../db");

const router = express.Router();

const ALLOWED_STATUSES = ["planning", "in_progress", "completed"];

// GET /api/projects
// Returns all projects with their client name.
router.get("/", async (req, res) => {
  try {
    const { client, search } = req.query;
    const queryTerm = (client || search || "").trim();

    let query = `
      SELECT
        p.id,
        p.name,
        p.status,
        p.client_id,
        c.name AS client_name
      FROM projects p
      JOIN clients c ON c.id = p.client_id
    `;
    const params = [];

    if (queryTerm) {
      query += ` WHERE c.name ILIKE $1`;
      params.push(`%${queryTerm}%`);
    }

    query += ` ORDER BY p.id ASC`;

    const result = await pool.query(query, params);
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

    // Validate project name
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Project name is required" });
    }

    // Validate client_id
    const clientIdNum = Number(client_id);
    if (!client_id || !Number.isInteger(clientIdNum) || clientIdNum <= 0) {
      return res.status(400).json({ error: "Valid client_id is required" });
    }

    // Check if client exists
    const clientCheck = await pool.query("SELECT id FROM clients WHERE id = $1", [clientIdNum]);
    if (clientCheck.rows.length === 0) {
      return res.status(400).json({ error: "Client not found" });
    }

    // Validate status (optional, defaults to 'planning')
    const projectStatus = status || "planning";
    if (!ALLOWED_STATUSES.includes(projectStatus)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${ALLOWED_STATUSES.join(", ")}`,
      });
    }

    const result = await pool.query(
      `INSERT INTO projects (name, client_id, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name.trim(), clientIdNum, projectStatus]
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

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${ALLOWED_STATUSES.join(", ")}`,
      });
    }

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
