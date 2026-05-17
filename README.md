අයියෝ එහෙමද? ඒකට හේතුව වෙන්න ඇත්තේ ඔයා ඒක සාමාන්‍ය Text Editor එකකින් (Notepad වගේ) බලපු නිසා වෙන්න ඇති.

Markdown (`.md`) file එකක් සාමාන්‍ය විදිහට open කළාම `#`, ``, `-` වගේ සංකේත විතරක් තියෙන ප්ලේන් text එකක් විදිහට තමයි පේන්නේ. හැබැයි මේ code එක **`README.md`** කියන නමින්ම ප්‍රධාන folder එක ඇතුළේ සේව් කරලා **GitHub එකට push කරපු සැනින්**, GitHub එකෙන් මේ සංකේත ඔක්කොම අඳුරගෙන ඉතාමත් වෘත්තීය මට්ටමේ ලස්සන UI එකකට මේක auto-render කරනවා.

ඔයාට ලේසි වෙන්න මම මෙතන **Raw Markdown Code** එකක් විදිහට දෙන්නම්. ඔයා මේ කොටුවේ දකුණු පැත්තේ උඩ තියෙන **"Copy"** button එක click කරලා සම්පූර්ණයෙන්ම copy කරගෙන ඔයාගේ `README.md` file එක ඇතුළට paste කරන්න:

```markdown
# Service Request Board

A comprehensive Full-Stack web application built as part of a Software Engineering assessment. This platform enables users to post, view, search, filter, update, and delete maintenance and service requests (e.g., Plumbing, Electrical, Painting, Joinery).

The project is structured as a monorepo containing both the frontend and backend services, fully optimized for production environments.

## 🚀 Live Links
- **Frontend URL:** [https://startling-kitsune-123.netlify.app](https://startling-kitsune-123.netlify.app)
- **Backend API URL:** [https://globaltna-assessment-production-af7a.up.railway.app](https://globaltna-assessment-production-af7a.up.railway.app)

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Deployment:** Netlify

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database ORM:** Mongoose
- **Deployment:** Railway

### Database
- **Provider:** MongoDB Atlas (Cloud Cluster)

---

## ✨ Features Implemented

### Core Requirements (CRUD Operations)
1. **Create Request:** A dedicated form with input validation to log new service issues.
2. **Read Dashboard:** An interactive homepage displaying all active requests sorted by the newest first.
3. **Detailed View:** Dedicated dynamic routes (`/jobs/[id]`) showing complete request profiles and metadata.
4. **Update Status:** Direct dropdown controls on the detail view to update lifecycle states (`Open`, `In Progress`, `Closed`).
5. **Delete Request:** Functional data purging with fallback user confirmation prompts.

### Bonus Features Included
- **Keyword Search:** A backend regex-driven filter mapping queries efficiently across both Title and Description attributes.
- **Category & Status Filtering:** Multi-layered aggregation toggles implemented across the main dashboard.
- **Production Deployment:** Live production configuration utilizing Netlify's Next.js Essential Runtime and Railway's containerized Node engine.

---

## 📁 Repository Structure

```text
globaltna-assessment/
├── backend/
│   ├── config/          # Database configuration settings
│   ├── controllers/     # Business logic handlers
│   ├── models/          # Mongoose Schemas
│   ├── routes/          # Express route definitions
│   ├── package.json
│   └── server.js        # Entry point for Express server
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js App Router
│   │   └── services/    # Axios configuration layer
│   ├── package.json
│   └── tailwind.config.js
└── netlify.toml         # Production pipeline deployment settings

```

---

## ⚙️ Getting Started & Local Setup

### 1. Clone the Repository

```bash
git clone [https://github.com/Diliwije/globaltna-assessment.git](https://github.com/Diliwije/globaltna-assessment.git)
cd globaltna-assessment

```

### 2. Backend Setup

```bash
cd backend
npm install

```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri_here

```

```bash
npm start

```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

```

```bash
npm run dev

```

---

## 🌐 Production Architecture & Deployment

### Backend (Railway)

* Root directory configuration set to `/backend`.
* Exposed on port `5000` with ecosystem variables panel (`MONGO_URI`).
* IP whitelisting configured via MongoDB Network Access using standard global ranges (`0.0.0.0/0`).

### Frontend (Netlify)

* Built utilizing the `@netlify/plugin-nextjs` pipeline specification defined within the root `netlify.toml` layout matrix.
* `NEXT_PUBLIC_API_URL` environment variables set up pointing towards the containerized Express routing endpoint.

```

මේක දාලා GitHub එකට push කරලා ඔයාගේ GitHub repository එකේ ප්‍රධාන පිටුව (Main page) check කරලා බලන්න, එතකොට මේක සුපිරියටම ලස්සනට පෙනෙයි!

```
