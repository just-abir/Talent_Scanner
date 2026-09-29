# 🎯 Talent Scanner

> **AI-Powered CV Analysis, Interview Preparation & Candidate Comparison Platform**

Talent Scanner is a full-stack web application that uses **Google Gemini AI** to help candidates prepare smarter for job interviews and help recruiters rank and compare multiple CVs instantly.

---

## ✨ Features

- 📄 **CV Upload & AI Analysis** — Upload your PDF resume and get an AI match score against any job description
- 🎤 **Interview Prep Report** — Receive tailored technical Q&As, behavioral Q&As, skill gap analysis, and a 7-day preparation plan
- 🏆 **Multi-CV Comparison** — Upload up to 5-7 CVs at once; AI ranks every candidate with a recommendation tier (`Strong Fit` / `Potential Fit` / `Not Recommended`)
- 📝 **AI-Tailored CV Generator** — Rewrites your CV as an ATS-optimized, job-targeted document — downloadable as PDF
- 📥 **PDF Report Export** — Download the full interview prep report as a clean, formatted PDF (powered by Puppeteer)
- 🔒 **JWT Authentication** — Secure cookie-based auth with token blacklisting on logout
- 🚫 **Resume Validation** — AI rejects non-resume files (stories, essays, random text) before processing

---

## 🛠️ Tech Stack

### Backend

| Technology                         | Purpose                                 |
| ---------------------------------- | --------------------------------------- |
| Node.js + Express 5                | REST API server                         |
| TypeScript                         | Type safety                             |
| MongoDB + Mongoose                 | Database & ODM                          |
| Google Gemini AI (`@google/genai`) | AI analysis & report generation         |
| Multer                             | File upload (PDF, images)               |
| pdf-parse                          | PDF text extraction                     |
| Puppeteer                          | HTML → PDF generation                   |
| JWT + bcrypt                       | Auth & password hashing                 |
| Zod                                | Schema validation & AI response shaping |

### Frontend

| Technology            | Purpose             |
| --------------------- | ------------------- |
| React 19 + TypeScript | UI framework        |
| Vite                  | Build tool          |
| Tailwind CSS v4       | Styling             |
| React Router DOM v7   | Client-side routing |
| Axios                 | HTTP client         |
| React Hook Form       | Form management     |
| Lucide React          | Icons               |

---

## 📁 Project Structure

```
Talent_Scanner/
├── backend/
│   ├── src/
│   │   ├── Controllers/        # Route handlers
│   │   │   ├── user.controller.ts
│   │   │   ├── interview.controller.ts
│   │   │   └── compariosn.controller.ts
│   │   ├── Router/             # Express routes
│   │   │   ├── user.route.ts
│   │   │   ├── interview.route.ts
│   │   │   └── comparison.route.ts
│   │   ├── Model/              # Mongoose schemas
│   │   │   ├── user.model.ts
│   │   │   ├── interviewReport.model.ts
│   │   │   ├── cvComparison.model.ts
│   │   │   └── backlist.mode.ts
│   │   ├── Services/
│   │   │   └── ai.services.ts  # All Gemini AI logic
│   │   ├── Middlewares/
│   │   │   ├── auth.middlewares.ts
│   │   │   └── multer.middlewares.ts
│   │   ├── Utils/
│   │   │   ├── asyncHandler.ts
│   │   │   ├── sendResponse.ts
│   │   │   └── apiError.ts
│   │   ├── Database/
│   │   │   └── db.ts
│   │   └── app.ts
│   ├── server.ts
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── Pages/
    │   │   ├── Hero.tsx          # Landing page
    │   │   ├── Home.tsx          # Dashboard
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── Compare.tsx       # Multi-CV upload
    │   │   ├── CompareReport.tsx
    │   │   └── InterviewReport.tsx
    │   ├── Api/                  # Axios API calls
    │   │   ├── user.api.ts
    │   │   ├── interview.api.ts
    │   │   └── comparison.api.ts
    │   ├── Context/
    │   │   ├── authContext.tsx
    │   │   └── interviewContext.tsx
    │   ├── Layouts/
    │   │   └── Navbar.tsx
    │   ├── hooks/
    │   │   └── useAuth.ts
    │   └── App.tsx
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB (local or Atlas)
- Google Gemini API Key → [Get one here](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/talent-scanner.git
cd talent-scanner
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Start the dev server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:5000`.

---

## 🔑 Environment Variables

### Backend — `backend/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:5000
```

---

## 📡 API Documentation

> All protected routes require a valid JWT token sent via **HttpOnly cookie** (`token`).

---

### 👤 User — `/api/user`

#### `POST /api/user/register`

Register a new user.

**Body (JSON):**

```json
{
  "userName": "john_doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response `201`:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "...",
    "userName": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "isVerified": false,
    "isActive": true
  }
}
```

---

#### `POST /api/user/login`

Login with email and password. Sets an HttpOnly cookie.

**Body (JSON):**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response `200`:**

```json
{
  "success": true,
  "message": "Login success",
  "data": { "id": "...", "userName": "john_doe", "email": "..." }
}
```

---

#### `GET /api/user/logout`

Logs out the user. Blacklists the current token and clears the cookie.

**Response `200`:**

```json
{ "success": true, "message": "User logout" }
```

---

#### `GET /api/user/getMe` 🔒

Get the currently authenticated user's profile.

**Response `200`:**

```json
{
  "success": true,
  "data": { "id": "...", "userName": "...", "email": "...", "role": "user" }
}
```

---

### 🎤 Interview — `/api/interview`

#### `POST /api/interview` 🔒

Upload a CV and generate an AI-powered interview prep report.

**Content-Type:** `multipart/form-data`

| Field             | Type     | Required | Description                 |
| ----------------- | -------- | -------- | --------------------------- |
| `resume`          | `File`   | ✅       | PDF or image of the CV      |
| `jobDescription`  | `string` | ✅       | Target job description text |
| `selfDescription` | `string` | ❌       | Candidate's self summary    |

**Response `201`:**

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "isValidResume": true,
    "matchScore": 78,
    "title": "Senior Backend Engineer",
    "technicalQuestions": [{ "question": "...", "intention": "...", "answer": "..." }],
    "behavioralQuestions": [...],
    "skillGaps": [{ "skill": "Kubernetes", "severity": "high" }],
    "preparationPlan": [{ "day": 1, "focus": "...", "tasks": ["..."] }]
  }
}
```

---

#### `GET /api/interview/recent` 🔒

Get all past interview reports for the logged-in user (summary only, no heavy fields).

**Response `200`:**

```json
{
  "success": true,
  "data": [
    { "_id": "...", "title": "...", "matchScore": 78, "createdAt": "..." }
  ]
}
```

---

#### `GET /api/interview/:id` 🔒

Get a specific interview report by ID.

**Response `200`:**

```json
{ "success": true, "data": { ...fullReport } }
```

---

#### `GET /api/interview/download-report/:id` 🔒

Download the full interview prep report as a **PDF file**.

**Response:** Binary PDF stream (`application/pdf`)

---

#### `POST /api/interview/generate-cv/:id` 🔒

Generate and download an AI-tailored, ATS-optimized CV as a **PDF** based on an existing interview report.

**Response:** Binary PDF stream (`application/pdf`)

---

### 🏆 Comparison — `/api/comparison`

#### `POST /api/comparison` 🔒

Upload multiple CVs and rank them against a job description.

**Content-Type:** `multipart/form-data`

| Field             | Type     | Required | Description              |
| ----------------- | -------- | -------- | ------------------------ |
| `resumes`         | `File[]` | ✅       | Up to 10 PDF/image CVs   |
| `jobDescription`  | `string` | ✅       | Target job description   |
| `selfDescription` | `string` | ❌       | Optional recruiter notes |

**Response `201`:**

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "candidates": [
      {
        "candidateName": "Alice Smith",
        "matchScore": 91,
        "summary": "Strong full-stack engineer...",
        "keyStrengths": ["React", "Node.js", "AWS"],
        "skillGaps": ["Kubernetes"],
        "recommendationTier": "Strong Fit"
      }
    ],
    "topPick": {
      "topCandidateName": "Alice Smith",
      "reasoning": "Alice outperformed all candidates..."
    }
  }
}
```

---

#### `GET /api/comparison/history` 🔒

Get all past CV comparison sessions for the logged-in user.

**Response `200`:**

```json
{ "success": true, "data": [{ "_id": "...", "createdAt": "..." }] }
```

---

#### `GET /api/comparison/:id` 🔒

Get a specific comparison report by ID.

**Response `200`:**

```json
{ "success": true, "data": { ...fullComparisonReport } }
```

---

## 🖼️ Screenshots

> _Add screenshots of your application here._

| Page                | Preview                                 |
| ------------------- | --------------------------------------- |
| 🏠 Landing Page     | ![Hero](./frontend/src/assets/hero.png) |
| 📊 Dashboard        | _(screenshot)_                          |
| 📄 Interview Report | _(screenshot)_                          |
| 🏆 Compare Report   | _(screenshot)_                          |

---

## 📄 License

This project is for educational and personal use. Feel free to fork and build on top of it.
