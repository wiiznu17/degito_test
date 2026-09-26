const express = require("express");
const cors = require("cors");
require("dotenv").config();

const projectsRouter = require("./routes/projects");
const clientsRouter = require("./routes/clients");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectsRouter);
app.use("/api/clients", clientsRouter);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Client Project Tracker API running on http://localhost:${PORT}`);
});
