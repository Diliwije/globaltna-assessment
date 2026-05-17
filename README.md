

```markdown
# Service Request Board (with JWT Authentication)

A professional Full-Stack Web Application built as part of the Software Engineering assessment for GlobalTNA. This platform allows authenticated users to seamlessly post, view, search, filter, update, and delete maintenance and service requests (e.g., Plumbing, Electrical, Painting, Joinery) through a modern, responsive, and highly optimized light-themed UI.

The project is structured as a monorepo housing both the containerized backend and the client-side frontend application.

## 🚀 Live Production Links
- **Frontend Live URL:** [https://startling-kitsune-123.netlify.app](https://startling-kitsune-123.netlify.app)
- **Backend API Live URL:** [https://globaltna-assessment-production-af7a.up.railway.app](https://globaltna-assessment-production-af7a.up.railway.app)

---

## 🛠️ Tech Stack & Key Technologies

### Frontend
- **Framework:** Next.js 14+ (App Router Architecture)
- **Styling:** Tailwind CSS (Modern Light-Theme Aesthetic)
- **State & Session Management:** React Context API (`AuthProvider`)
- **HTTP Client:** Axios (Configured with request interceptors for automated token attachment)

### Backend
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database ORM:** Mongoose
- **Security & Encryption:** JSON Web Tokens (JWT) & bcryptjs (Password Hashing)

### Database
- **Provider:** MongoDB Atlas (Cloud Cluster configured for the `test` database environment)

---

## ✨ Features Implemented

### 1. Secure Authentication & Authorization (JWT)
- **User Management:** Secure user registration and login pathways. Passwords are encrypted utilizing `bcryptjs` salts before database storage.
- **Frontend Route Guards:** Intercepts unauthorized page requests. Users trying to access the Dashboard (`/`) or the creation form (`/new`) without authenticating are immediately redirected to the `/login` view.
- **Protected Backend API Endpoints:** Custom middleware validation intercepts `POST`, `PATCH`, and `DELETE` execution pipelines to enforce valid `Bearer` tokens.

### 2. Core Business Logic (CRUD Operations)
- **Create Request:** Data validation forms that capture input schemas and automatically map the logged-in user's reference database ID (`user`) to the created entry.
- **Read Dashboard:** An interactive homepage that lists active service requests dynamically sorted by the newest records first. Employs Mongoose `.populate()` to seamlessly render the creator's identity properties ("Posted by: [User Name]").
- **Detailed Component Routing:** Dynamic sub-routing (`/jobs/[id]`) presenting comprehensive request parameters, metadata records, and custom user logs.
- **Update Status:** Embedded control mechanisms enabling users to mutate record states safely (`Open`, `In Progress`, `Closed`).
- **Data Purging:** Fully functional document deletion processes guarded with safety confirmation modals.

### 3. Intermediate Enhancements
- **Regex Query Engine:** Efficient server-side search patterns triggering case-insensitive lookups mapping across both Title and Description schemas.
- **Multi-layered Filter Matrices:** Synchronized UI state toggles matching Category and Status queries concurrently.

---

## 📁 Repository Structure

```text
globaltna-assessment/
├── backend/
│   ├── config/          # Database connection profiles
│   ├── controllers/     # Business logic handlers (job & auth controllers)
│   ├── middleware/      # JWT protection authorization intercepts
│   ├── models/          # Mongoose Database Schemas (JobRequest.js, User.js)
│   ├── routes/          # Express route pathway blueprints (jobRoutes.js, authRoutes.js)
│   ├── package.json
│   └── server.js        # Express server application entry point
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js App Router (Layouts, Views & Contexts)
│   │   │   ├── context/ # React Auth Context API engine
│   │   │   ├── login/   # Login page implementation view
│   │   │   └── register/# Registration page implementation view
│   │   └── services/    # Axios instances containing automated Bearer header interceptors
│   ├── package.json
│   └── tailwind.config.js
└── netlify.toml         # Automated deployment and pipeline configuration configurations for Netlify

```

---

## ⚙️ Environment Variables Configuration

To spin up this project locally, you must create distinct environment variable configuration files within both target environment roots.

### Backend Environment Setup (`backend/.env`)

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://dilshanwijerathna426_db_user:d7cZp9k4VPPAucUa@pos-devops.4z0ljwd.mongodb.net/test?appName=pos-devops
JWT_SECRET=your_super_secret_jwt_key_here

```

### Frontend Environment Setup (`frontend/.env.local`)

Create a `.env.local` file inside the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

```

---

## 💻 Local Setup & Installation

Execute the following commands sequentially inside your terminal window to boot the application stacks locally:

### 1. Clone the Codebase

```bash
git clone [https://github.com/Diliwije/globaltna-assessment.git](https://github.com/Diliwije/globaltna-assessment.git)
cd globaltna-assessment

```

### 2. Boot the Express Server Instance

```bash
cd backend
npm install
npm start

```

*The service pipeline will compile and stream on `http://localhost:5000` alongside an active MongoDB cluster connection log.*

### 3. Launch the Client Application Instance

Open a completely separate terminal tab or window starting at the codebase root directory:

```bash
cd frontend
npm install
npm run dev

```

*The web platform interface will hot-reload and compile successfully on `http://localhost:3000`.*

---

## 🌐 Core API Endpoint Blueprints

### Authentication Enclave (`/api/auth`)

* `POST /api/auth/register` - Create a clean user profile account.
* `POST /api/auth/login` - Verify user credentials and generate an active JWT.

### Service Board Requests Enclave (`/api/jobs`)

* `GET /api/jobs` - Public list extraction interface supporting dynamic filtering attributes (`?search=`, `?category=`, `?status=`).
* `GET /api/jobs/:id` - Public profile fetching for a target resource document.
* `POST /api/jobs` - Protected write handler creating new records mapped to active users.
* `PATCH /api/jobs/:id` - Protected updates modifying workflow lifecycle state parameters.
* `DELETE /api/jobs/:id` - Protected resource destruction triggers.

```

```
