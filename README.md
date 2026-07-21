# Resume Analyzer | MERN Stack ATS Resume Checker

## Live Demo

Coming Soon 🚧

The application will be deployed using Vercel (Frontend) and Render (Backend).


Resume Analyzer is a full-stack MERN application that helps job seekers evaluate how well their resume matches a specific job description. Users can upload a PDF resume, paste a job description, and receive an estimated ATS compatibility score along with keyword analysis, skills matching, resume section checks, and personalized improvement recommendations.

## Table of Contents

- Problem Solved
- Motivation
- Features
- Tech Stack
- Database
- Project Architecture
- Folder Structure
- Screenshots
- Installation
- Environment Variables
- How to Run
- REST API Endpoints
- Database Design
- Scoring System
- Security
- Validation
- Key Learnings
- Future Improvements
- Disclaimer
- License
- Author


## Problem Solved

Generic resume tips are not enough when every job posting has different requirements. Resume Analyzer lets users upload a PDF resume, paste a job description, and get a tailored match report covering keywords, technical skills, resume sections, and improvement recommendations.

## Motivation

Many online ATS checkers provide generic feedback without considering the requirements of a specific job description. This project was built to provide personalized resume analysis by comparing resumes against individual job postings and highlighting areas for improvement.

## Features

- User registration, login, logout with JWT authentication
- Secure password hashing with bcrypt
- RESTful API architecture following MVC design principles
- PDF resume upload with file type and size validation
- Text extraction from uploaded resumes
- Job-description-specific analysis (not generic scoring)
- Estimated ATS compatibility score (0–100) with transparent breakdown
- Keyword analysis (matched, missing, match percentage)
- Skills analysis by category (languages, frameworks, databases, tools)
- Resume section checker (contact, summary, skills, projects, experience, education, certifications)
- Personalized improvement recommendations
- Analysis dashboard with charts
- Analysis history stored in MongoDB (view, reopen, delete)

## Tech Stack

**Frontend**
- React (Vite)
- JavaScript 
- Tailwind CSS
- React Router
- Recharts
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT + bcryptjs
- Express Validator
- Multer (file uploads)
- pdfjs-dist (PDF text extraction)

## Database

- MongoDB Atlas / Local MongoDB

## Project Architecture

## Project Architecture

```text
                User
                  │
                  ▼
        React Frontend (Vite)
                  │
          Axios HTTP Requests
                  │
                  ▼
      Express.js REST API (JWT)
                  │
      Resume Analysis Engine
                  │
                  ▼
       MongoDB Database (Mongoose)
```

## Folder Structure

```text
resume-analyzer
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## Screenshots

Screenshots will be added after deployment.

- Landing Page
- Dashboard
- New Analysis
- Analysis Results

## Installation

### Prerequisites

- Node.js (v18 or later)
- MongoDB running locally or MongoDB Atlas URI

### 1. Clone the repository

```bash
git clone https://github.com/prabh16/resume-analyzer.git

cd resume-analyzer
```

### 2. Backend setup

```bash
cd backend
copy .env.example .env
npm install
```

### 3. Frontend setup

```bash
cd ../frontend
copy .env.example .env
npm install
```

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | API server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | Token expiry (e.g. `7d`) |
| `CLIENT_URL` | Frontend URL for CORS |
| `MAX_FILE_SIZE_MB` | Max PDF upload size |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

## How to Run

Open two terminals:

**Terminal 1 – Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 – Frontend**
```bash
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## REST API Endpoints

### Auth
- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user
- `GET /api/auth/me` – Get current user (protected)

### Resumes
- `POST /api/resumes/upload` – Upload PDF resume (protected)
- `GET /api/resumes/active` – Get active resume (protected)
- `DELETE /api/resumes/active` – Delete active resume (protected)
- `GET /api/resumes/history` – Resume upload history (protected)

### Analyses
- `GET /api/analyses/dashboard` – Dashboard stats (protected)
- `POST /api/analyses` – Create new analysis (protected)
- `GET /api/analyses` – List analyses (protected)
- `GET /api/analyses/:id` – Get analysis details (protected)
- `DELETE /api/analyses/:id` – Delete analysis (protected)

## Database Models & Relationships

### User
Stores account credentials and profile basics.

### Resume
Belongs to a **User** (`user` field). Holds uploaded PDF metadata and extracted text. Only one resume is active at a time per user.

### Analysis
Belongs to a **User** and references a **Resume**. Stores job details, score, keyword/skills/section results, and recommendations.

```
User (1) ──< (many) Resume
User (1) ──< (many) Analysis
Resume (1) ──< (many) Analysis
```

## Scoring System

The estimated match score is weighted across:

| Factor | Weight |
|---|---|
| Keyword match | 25% |
| Technical skills match | 20% |
| Resume sections | 15% |
| Contact information | 10% |
| Action verbs | 10% |
| Measurable achievements | 10% |
| Length & readability | 10% |

The compatibility score is calculated using weighted metrics such as keyword relevance, technical skills, resume structure, measurable achievements, action verbs, and readability. This score is intended as an educational estimate and should not be considered an official ATS evaluation.

## Security

- JWT Authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation
- File upload validation
- CORS configuration

## Validation

- Accepts PDF files only
- Maximum file size validation
- Required field validation
- Duplicate email prevention
- Protected routes

## Key Learnings

Through this project I learned:

- JWT Authentication
- File uploads with Multer
- PDF text extraction
- MongoDB relationships
- REST API development
- React state management
- Dashboard visualization using Recharts

## Future Improvements

- OCR support for scanned/image-based PDFs
- Resume bullet rewriting suggestions
- Side-by-side resume vs job description highlighting
- Export analysis report as PDF
- Admin panel and analytics
- Email verification and password reset
- Deploy to cloud (Render, Railway, Vercel)
- AI-powered resume improvement suggestions

## Disclaimer

This application provides an estimated ATS compatibility score using custom scoring logic. It is designed for learning and self-improvement and does not replicate commercial ATS software used by employers.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author

**Prabhnoor**

GitHub: [@prabh16](https://github.com/prabh16)