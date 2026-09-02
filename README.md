# AI-Powered OnRoad 360° Emergency, Fuel, Insurance & Emission Assistance System

A full-stack MERN academic project that unifies emergency support, vehicle health analysis, fuel prediction, insurance advisory, emission evaluation, mechanic finding, map assistance, maintenance guidance, audio diagnostics, prediction history, and chatbot support.

## Important Notes
- No FASTag integration is used.
- No IoT hardware/sensors are required.
- Works on user-provided and simulation-based data.
- AI/ML results are educational/simulation-oriented and not guaranteed legal/mechanical/financial outputs.
- Emission results are app-level evaluation, not an official government certificate.

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS + Leaflet
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **ML Layer:** Backend simulation abstraction for Random Forest, Logistic Regression, Linear Regression, Decision Tree, K-Means, and KNN style predictions.

## Project Structure
```
client/   # React frontend
server/   # Express backend + MongoDB models + APIs + tests
```

## Setup (Replit/local)
1. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
2. **Configure backend env**
   ```bash
   cp server/.env.example server/.env
   ```
   Update values if needed.
3. **Run backend**
   ```bash
   cd server
   npm run dev
   ```
4. **Run frontend**
   ```bash
   cd client
   npm run dev
   ```
5. Open the frontend URL and use `/register` to create a user.

## Core Routes (Frontend)
`/login`, `/register`, `/dashboard`, `/profile`, `/emergency`, `/driving-analysis`, `/vehicle-health`, `/audio-diagnostics`, `/fuel`, `/mechanics`, `/map`, `/maintenance`, `/insurance`, `/emission`, `/chatbot`, `/history`, `/admin`

## REST API Endpoints
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
- `POST /api/diagnostics/audio`
- `POST /api/chat`
- `GET /api/history`
- `GET /api/admin/dashboard`
- `GET /api/mechanics`
- `POST /api/mechanics/request`
- `GET /api/map/assistance`
- `POST /api/reports/:type/pdf`

## Testing
Run focused backend tests:
```bash
cd server
npm test
```
Includes:
- unit tests for prediction functions
- integration tests for auth + protected API flow
