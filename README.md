# AI-Powered OnRoad 360° Emergency, Fuel, Insurance & Emission Assistance System

A complete MERN full-stack academic project platform for unified vehicle-user assistance, combining emergency support, driving behavior analysis, panic-cluster detection, vehicle health checks, fuel estimation, smart maintenance, insurance advisory, emission evaluation, mechanic finder, map support, chatbot guidance, and PDF report generation.

## Important Project Scope Notes

- No FASTag usage anywhere in this project.
- No IoT hardware/sensor dependency.
- Works with user-provided and simulation-friendly data.
- AI/ML outputs are clearly labeled as **AI/ML simulation-based** where applicable.
- This system is for educational decision support and does **not** replace official emergency/mechanical/insurance/emission authorities.

---

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS (via `@tailwindcss/vite`)
- JavaScript
- React Router
- Leaflet + React-Leaflet
- Chart.js

### Backend
- Node.js
- Express.js REST APIs
- JWT authentication
- Role-based authorization
- Validation + secure error handling

### Database
- MongoDB with Mongoose models
- Automatic simulation-memory fallback when MongoDB is unavailable

### ML Layer
Backend ML abstraction (`backend/src/services/mlService.js`) with simulation-friendly logic mapped to:
- Random Forest / Decision Tree / Logistic Regression (classification/risk)
- Linear Regression (fuel estimation)
- K-Means (panic cluster behavior analysis)
- KNN (similarity-style recommendation behavior)

---

## Project Structure

```text
.
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── data/
│   │   └── tests/
│   └── .env.example
├── frontend
│   └── src
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── utils/
└── README.md
```

---

## Pages Implemented

- `/` Landing / Home
- `/login`, `/register`
- `/dashboard`
- `/emergency`
- `/driving-analysis`
- `/vehicle-health`
- `/audio-diagnostics`
- `/fuel`
- `/mechanics`
- `/map`
- `/maintenance`
- `/insurance`
- `/emission`
- `/chatbot`
- `/history`
- `/admin` (admin role protected)

---

## Backend REST APIs

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/profile`
- `POST /api/emergency`
- `GET /api/emergency`
- `PUT /api/emergency/:id`
- `POST /api/behavior/analyze`
- `POST /api/vehicle/health`
- `POST /api/fuel/predict`
- `POST /api/maintenance/predict`
- `POST /api/insurance/recommend`
- `POST /api/emission/analyze`
- `GET /api/emission/report/:id`
- `POST /api/diagnostics/audio`
- `POST /api/chat`
- `GET /api/chat`
- `GET /api/history`
- `GET /api/admin/dashboard`
- `GET /api/mechanics`
- `POST /api/mechanics/request`
- `GET /api/mechanics/requests`
- `GET /api/map/points`
- `POST /api/reports/pdf`

---

## MongoDB Collections/Models

- User
- Vehicle
- EmergencyRequest
- BehaviorAnalysis
- VehicleHealth
- FuelPrediction
- MaintenanceRecord
- InsuranceRecommendation
- EmissionRecord
- DiagnosticRecord
- ChatMessage
- PredictionHistory
- MechanicRequest

All models use timestamps.

---

## Authentication & Security

- Password hashing (`bcryptjs`)
- JWT authentication
- Role-based authorization (`user`, `admin`)
- Protected API routes
- Input validation (`express-validator`)
- Helmet, CORS, centralized safe errors
- No password leakage in responses

---

## Testing Coverage

### Implemented automated tests
- Unit testing: ML prediction functions (`backend/src/tests/mlService.test.js`)
- Integration smoke testing: API health endpoint (`backend/src/tests/app.test.js`)

### Suggested manual testing scenarios included in app workflow
- Emergency request submission and risk status
- Vehicle health analysis
- Fuel prediction and station suggestions
- Emission evaluation and report generation
- Insurance recommendation
- Mechanic request flow
- Chatbot interaction history
- Admin emergency actions

---

## Setup Instructions (Replit/Local)

### 1) Install dependencies

From repository root:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 2) Configure backend env

```bash
cp backend/.env.example backend/.env
```

Update values in `backend/.env`:

- `MONGO_URI` (local MongoDB or MongoDB Atlas)
- `JWT_SECRET`
- `ADMIN_INVITE_CODE`
- `CLIENT_URL` (default `http://localhost:5173`)

> If MongoDB is not reachable, backend continues in simulation persistence mode for demo continuity.

### 3) Run full stack

From repository root:

```bash
npm run dev
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

### 4) Build frontend

```bash
npm run build
```

### 5) Run backend tests

```bash
npm test
```

---

## Academic Demonstration Notes

- Professional responsive UI using reusable components and protected routing
- Every major module has working form → API → analysis → output flow
- PDF reporting integrated for module summaries
- Map, mechanic, fuel station, and safe route support work with realistic sample data when external live services are absent
- All AI/ML decisions clearly marked as simulation-compatible outputs

---

## Disclaimer

This application is an educational MCA project demonstrating integrated full-stack and AI/ML-assisted decision-support concepts. Outputs are informational and should not be treated as official emergency, mechanical, legal, insurance, or government emission certification decisions.
