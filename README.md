📝 Task Manager — To-Do List

A full-stack **Task Management App** built with:

- Task **creation**, **editing**, **completion**, and **archiving**
- **FastAPI** backend with JWT Auth and MySQL
- **React + Tailwind CSS v4** frontend
- **Docker** for development setup
- Login & Signup with JWT-based session handling

---
## Tech Stack

| Layer             | Technology |
|-------------------|--------|
| Frontend          | React + TailwindCSS + Vite + Axios   |
| Backend           | FastAPI + Pydantic + Uvicorn + SQLAlchemy + Python3   |
| State Management  | React Context API   |
| Database          | MySQL 8 |
| Containerization  | Docker + Docker Compose  |
| CI/CD             | Github Actions   |


## Project Structure

```
project-root/
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── tasks.py
│   │   ├── shcemas.py
│   │   ├── database.py
│   │   └── auth.py
│   └── requirements.txt
├── frontend/              # React + Tailwind frontend
│   ├── public/
│   │   └── *.png
│   ├── src/
│   │   ├── pages/
│   │   │   └── Login.jsx, Tasks.jsx, Archive.jsx, Signup.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── api.js
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

---

##  Setup Instructions

### ⚙️ Prerequisites

- [Docker](https://www.docker.com/)
- Node.js v20+
- (Optional) Python 3.10+ and pip (if running backend without Docker)

Local Development with Docker

This project is fully Dockerized for convenience.

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/task-manager-notebook.git
cd task-manager-notebook
```

### Step 2: Setup `.env` files

Create `.env` inside `backend/`:

```env
DATABASE_URL=mysql+mysqlconnector://user:password@db:3306/taskdb
JWT_SECRET=your_jwt_secret
```

In `frontend/`, no `.env` is required unless changing API base URL.

### Step 3: Run everything with Docker

```bash
docker-compose up --build
```

- 🧠 FastAPI: http://localhost:8000
- 📘 React frontend: http://localhost:5173
- 🐬 MySQL DB: port 3306 inside container

---

## ✨ Features

- ✅ Task CRUD (Create, Read, Update, Delete)
- 📅 Deadlines with auto-sorting
- 📦 Archive completed tasks
- 🔐 Login/Signup via JWT Auth
- 🎨 Fully-themed UI

---

## API Reference

### Auth

| Endpoint          | Method | Description     |
|-------------------|--------|-----------------|
| `/auth/signup`    | POST   | Register user   |
| `/auth/login`     | POST   | Get JWT token   |

### Tasks

| Endpoint          | Method | Description         |
|------------------|--------|---------------------|
| `/tasks/`        | GET    | Get user’s tasks    |
| `/tasks/`        | POST   | Create a new task   |
| `/tasks/{id}`    | PUT    | Update a task       |
| `/tasks/{id}`    | DELETE | Delete a task       |

---

## 🧼 Cleanup & Rebuild

```bash
docker-compose down -v
docker-compose up --build
```
