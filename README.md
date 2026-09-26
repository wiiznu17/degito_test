# Client Project Tracker — Starter Project

โปรเจกต์นี้เป็น Starter Code สำหรับแบบทดสอบเทคนิค ตำแหน่ง Fullstack Developer (Junior) ของ Degito
รายละเอียดโจทย์ (บั๊กที่ต้องแก้ และฟีเจอร์ที่ต้องเพิ่ม) อยู่ในเอกสารแยกที่ส่งให้พร้อมกันนี้

## Stack

- Frontend: React (Vite)
- Backend: Node.js + Express (REST API)
- Database: PostgreSQL

## วิธีติดตั้งและรัน

### 1) เตรียมฐานข้อมูล

**ตัวเลือก A — ใช้ Docker (แนะนำ ถ้าเครื่องมี Docker):**

```bash
docker compose up -d
```

จะได้ PostgreSQL รันที่ `localhost:5432` พร้อมข้อมูลตั้งต้นจาก `db/init.sql` โดยอัตโนมัติ

**ตัวเลือก B — ใช้ PostgreSQL ที่ติดตั้งในเครื่องอยู่แล้ว:**

```bash
createdb degito_test
psql -d degito_test -f db/init.sql
```

### 2) รัน Backend

```bash
cd backend
cp .env.example .env   # แก้ DATABASE_URL ถ้าจำเป็น
npm install
npm run dev
```

Backend จะรันที่ `http://localhost:4000`

### 3) รัน Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend จะรันที่ `http://localhost:5173`

## โครงสร้างโปรเจกต์

```
db/init.sql          — schema และข้อมูลตั้งต้น
backend/
  server.js          — entry point ของ Express
  db.js              — การเชื่อมต่อฐานข้อมูล
  routes/projects.js — endpoints ของ projects
  routes/clients.js  — endpoints ของ clients
frontend/
  src/App.jsx        — หน้าหลักของแอป
  src/api.js         — ฟังก์ชันเรียก API
```

## หมายเหตุ

- ข้อมูลตั้งต้นจำลองลูกค้าและโปรเจกต์ของ Degito ไว้ให้พร้อมทดสอบ ไม่ต้องสร้างข้อมูลเพิ่มเองก่อนเริ่ม
- ให้ทำงานตามรายละเอียดในเอกสารโจทย์ที่แนบมา แล้วส่งกลับตามที่ระบุไว้ในเอกสารนั้น
