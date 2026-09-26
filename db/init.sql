-- Client Project Tracker — schema + seed data

CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  client_id INTEGER NOT NULL REFERENCES clients(id),
  status VARCHAR(50) NOT NULL DEFAULT 'planning',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_notes (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  note TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO clients (name) VALUES
  ('Sansiri'),
  ('CBRE'),
  ('Bangkok Bank'),
  ('PTTEP');

INSERT INTO projects (name, client_id, status) VALUES
  ('Corporate Website Revamp', 1, 'in_progress'),
  ('Sales Gallery Microsite', 1, 'completed'),
  ('Careers Page', 2, 'in_progress'),
  ('CRM Integration', 2, 'planning'),
  ('Mobile Banking App', 3, 'in_progress'),
  ('Internal Dashboard', 3, 'completed'),
  ('Careers + SuccessFactors', 4, 'in_progress');

-- Some projects have multiple notes on purpose — this is what triggers the
-- duplicate-row bug in the /api/projects query if you don't handle the JOIN correctly.
INSERT INTO project_notes (project_id, note) VALUES
  (1, 'Kickoff call done'),
  (1, 'Design draft approved by client'),
  (1, 'Dev started on homepage'),
  (3, 'Waiting on content from HR team'),
  (5, 'Firebase setup complete'),
  (5, 'iOS build submitted for review');
