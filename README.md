# 🛠️ Service Request Board

> A full-stack web application built for the **GlobalTNA Software Engineering Assessment** — enabling authenticated users to post, manage, search, filter, and track maintenance and service requests across categories like Plumbing, Electrical, Painting, and Joinery.

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=nextdotjs)
![Express](https://img.shields.io/badge/Express.js-4.x-green?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge&logo=jsonwebtokens)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge&logo=tailwindcss)

</div>

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| 🖥️ **Frontend** | [https://startling-kitsune-123.netlify.app](https://startling-kitsune-123.netlify.app) |
| ⚙️ **Backend API** | [https://globaltna-assessment-production-af7a.up.railway.app](https://globaltna-assessment-production-af7a.up.railway.app) |

---

## ✨ Features

### 🔐 Authentication & Authorization (JWT)
- Secure **user registration and login** with `bcryptjs` password hashing
- **Frontend route guards** — unauthenticated users are redirected from `/` and `/new` to `/login`
- **Protected API endpoints** — `POST`, `PATCH`, and `DELETE` routes require a valid `Bearer` token via custom middleware

### 📋 CRUD Operations
- **Create** — Form with validation; automatically links the request to the logged-in user's ID
- **Read** — Dashboard listing all requests sorted newest-first, with creator name via Mongoose `.populate()`
- **Detail View** — Dynamic routing at `/jobs/[id]` showing full request info, metadata, and logs
- **Update** — Change request status between `Open`, `In Progress`, and `Closed`
- **Delete** — Permanent deletion with a confirmation modal for safety

### 🔍 Search & Filtering
- **Server-side regex search** — Case-insensitive lookups across both Title and Description fields
- **Multi-filter support** — Simultaneously filter by **Category** and **Status**

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 14+ (App Router) |
| **Styling** | Tailwind CSS |
| **State / Auth Management** | React Context API (`AuthProvider`) |
| **HTTP Client** | Axios (with request interceptors for auto token attachment) |
| **Backend Runtime** | Node.js + Express.js |
| **Database ORM** | Mongoose |
| **Database** | MongoDB Atlas (`test` database) |
| **Auth** | JSON Web Tokens (JWT) + bcryptjs |

---

## 📁 Project Structure

```
globaltna-assessment/
├── backend/
│   ├── config/          # Database connection setup
│   ├── controllers/     # Business logic (auth & job controllers)
│   ├── middleware/       # JWT verification middleware
│   ├── models/          # Mongoose schemas (User.js, JobRequest.js)
│   ├── routes/          # Express routes (authRoutes.js, jobRoutes.js)
│   ├── server.js        # Express app entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── context/    # React Auth Context
│   │   │   ├── login/      # Login page
│   │   │   └── register/   # Registration page
│   │   └── services/       # Axios instance with Bearer token interceptor
│   ├── tailwind.config.js
│   └── package.json
└── netlify.toml             # Netlify deployment configuration
```

---

## ⚙️ Environment Variables

### Backend — `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/test?appName=<appName>
JWT_SECRET=your_super_secret_jwt_key_here
```

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> ⚠️ Never commit `.env` files to version control. Add them to `.gitignore`.

---

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Diliwije/globaltna-assessment.git
cd globaltna-assessment
```

### 2. Start the Backend

```bash
cd backend
npm install
npm start
```

The server will run at **http://localhost:5000** and connect to MongoDB Atlas.

### 3. Start the Frontend

Open a **new terminal** from the project root:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:3000**.

---

## 📡 API Reference

### Auth Endpoints — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive a JWT | ❌ |

### Jobs Endpoints — `/api/jobs`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/jobs` | List all requests (supports `?search=`, `?category=`, `?status=`) | ❌ |
| `GET` | `/api/jobs/:id` | Get a single request by ID | ❌ |
| `POST` | `/api/jobs` | Create a new service request | ✅ |
| `PATCH` | `/api/jobs/:id` | Update request status | ✅ |
| `DELETE` | `/api/jobs/:id` | Delete a request | ✅ |

---

## 🗄️ Database

This project uses **MongoDB Atlas** with the `test` database. Collections:

- `users` — Stores registered user accounts (hashed passwords)
- `jobrequests` — Stores all service request documents with user references

---

## 📜 License

This project was built as part of a software engineering assessment for **GlobalTNA**. All rights reserved.
