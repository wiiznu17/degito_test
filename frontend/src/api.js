const API_URL = "http://localhost:4000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  return res.json();
}

export function getProjects() {
  return request("/api/projects");
}

export function getClients() {
  return request("/api/clients");
}

export function createProject(data) {
  return request("/api/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateStatus(id, status) {
  return request(`/api/projects/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
