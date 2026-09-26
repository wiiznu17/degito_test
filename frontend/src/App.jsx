import { useEffect, useState } from "react";
import { getProjects, getClients, createProject, updateStatus } from "./api";

const STATUS_OPTIONS = ["planning", "in_progress", "completed"];

export default function App() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", client_id: "" });

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  function fetchProjects() {
    getProjects().then(setProjects);
  }

  function fetchClients() {
    getClients().then(setClients);
  }

  function handleStatusChange(projectId, newStatus) {
    updateStatus(projectId, newStatus).then(() => {
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        project.status = newStatus;
      }
      setProjects(projects);
    });
  }

  function handleCreate(e) {
    e.preventDefault();
    createProject({
      name: newProject.name,
      client_id: Number(newProject.client_id),
    }).then(() => {
      setNewProject({ name: "", client_id: "" });
      fetchProjects();
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Client Project Tracker</h1>
        <p>Internal tool for tracking active client projects.</p>
      </header>

      <section className="new-project">
        <h2>Add Project</h2>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Project name"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
          />
          <select
            value={newProject.client_id}
            onChange={(e) =>
              setNewProject({ ...newProject, client_id: e.target.value })
            }
          >
            <option value="">Select client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
      </section>

      <section className="project-list">
        <h2>Projects</h2>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.client_name}</td>
                <td>
                  <span className="status-badge">{p.status}</span>
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) {
                        handleStatusChange(p.id, e.target.value);
                      }
                      e.target.value = "";
                    }}
                  >
                    <option value="">Change status…</option>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
