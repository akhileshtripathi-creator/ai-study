# 📚 PlanGenius AI — Full-Stack AI Study Planner

A modern, responsive full-stack AI Study Planner built with **React + Vite**, **Node.js + Express**, and the **Google Gemini API**.

PlanGenius AI creates personalized, evidence-based study roadmaps tailored to your subjects, exam date, daily hours, preferred study time, and current preparation level.

---

## 🚀 Features

1. **Subjects Management**: Enter and tag multiple subjects/courses with quick-add recommendations.
2. **Exam Countdown Calculation**: Set target exam date with automatic countdown and days-remaining metrics.
3. **Daily Study Capacity**: Configure daily study hours (1 to 14 hours) with quick-select buttons.
4. **Peak Energy Time Windows**: Calibrate routines for *Morning (Deep Focus)*, *Afternoon*, *Evening*, *Night Owl*, or *Flexible/Split*.
5. **Preparation Level Calibration**: Tailor strategy for *Beginner*, *Intermediate*, *Advanced*, or *Final Revision*.
6. **Important & Weak Topics Input**: Prioritize high-weightage topics and personal weak spots.
7. **Comprehensive AI-Generated Roadmap**:
   - ⏱️ **Daily Study Timetable**: Chronological schedule divided into Deep Work, Practice, Revision, and Recovery breaks.
   - 📊 **Subject-Wise Study Hours**: Visual percentage distribution, weekly hours, total hours, and academic rationale.
   - 🎯 **Priority Topics**: Categorized by High/Medium/Low priority with estimated mastery time and exam relevance.
   - 🔄 **Scientifically Spaced Revision**: Multi-phase spaced repetition schedule (Immediate recall, Spaced testing, Cumulative synthesis).
   - 🏆 **Evidence-Based Practice Tactics**: Actionable cognitive techniques (Active recall, Feynman method, timed past papers, interleaving).
   - ✅ **Interactive Study Task Tracker**: Checklist with completion checkboxes, live progress bar, filter by status, ability to add custom tasks, and persistent state saved to `localStorage`!
8. **Print & PDF Export**: Instant print-ready styling for offline study desks.
9. **Zero-Friction Fallback (Smart Demo Mode)**: If no Gemini API key is configured yet, the app gracefully switches to an offline mock generator so you can test and explore immediately without errors.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**:
  - React 19
  - Vite 6
  - Tailwind CSS 3.4
  - Lucide React (Icons)
  - Canvas Confetti (Celebration animations)
- **Backend**:
  - Node.js (v24+) + Express (ES Modules)
  - `@google/genai` (Official Google Gemini SDK)
  - `dotenv` (Environment variable management)
  - `cors` (Cross-Origin Resource Sharing)
- **Security**:
  - Gemini API calls are strictly executed on the backend.
  - The Gemini API key is **never** exposed to client-side code.
  - `.env` is excluded in `.gitignore`.

---

## 📁 Project Structure

```text
ai-study-planner/
├── .gitignore                     # Root gitignore (protects .env & node_modules)
├── README.md                      # Complete documentation
│
├── backend/                       # Node.js + Express API
│   ├── .env                       # Environment variables (GEMINI_API_KEY)
│   ├── .env.example               # Template for environment variables
│   ├── .gitignore                 # Backend gitignore
│   ├── package.json               # Backend dependencies & scripts
│   ├── server.js                  # Express server entry point (port 5000)
│   ├── routes/
│   │   └── plannerRoutes.js       # /api/planner routes (generate, status)
│   ├── services/
│   │   └── geminiService.js       # Google Gemini SDK integration & fallback
│   └── utils/
│       └── mockPlan.js            # Smart offline roadmap generator
│
└── frontend/                      # React + Vite application
    ├── index.html                 # App shell with custom fonts & favicon
    ├── package.json               # Frontend dependencies & scripts
    ├── vite.config.js             # Vite configuration with /api proxy to backend
    ├── tailwind.config.js         # Tailwind styling configuration
    ├── postcss.config.js          # PostCSS configuration
    └── src/
        ├── App.jsx                # Main application component & state
        ├── main.jsx               # React DOM entrypoint
        ├── index.css              # Tailwind base & custom animations
        ├── api/
        │   └── client.js          # Fetch API client connecting to backend
        └── components/
            ├── Header.jsx         # App navigation & Gemini status badge
            ├── PlanForm.jsx       # 6-parameter interactive input form
            ├── PlanDisplay.jsx    # Roadmap dashboard & tabbed views
            ├── TimetableView.jsx  # Daily timetable timeline
            ├── SubjectHoursChart.jsx # Visual distribution bars & metrics
            ├── PriorityTopicsView.jsx # Priority topic cards & key concepts
            ├── RevisionScheduleView.jsx # Spaced repetition roadmap
            ├── PracticeSuggestionsView.jsx # Cognitive study techniques
            ├── TaskTracker.jsx    # Interactive checklist with localStorage
            ├── LoadingSkeleton.jsx # Motivational loading state
            └── ErrorAlert.jsx     # Friendly error alerts & retry
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your system.

### 2. Configure Your Gemini API Key (Optional for Live AI)
1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Open `backend/.env` and replace `your_gemini_api_key_here` with your key:
   ```env
   PORT=5000
   GEMINI_API_KEY=AIzaSy...your_actual_key...
   GEMINI_MODEL=gemini-2.5-flash
   ```
   *(Note: If you run without a key, the backend automatically uses the Smart Mock Engine so everything still works!)*

---

### 3. Run the Backend Server

In a terminal:
```bash
cd backend
npm install
npm run dev
```
The backend server will start on: **`http://localhost:5000`**
- Health check: `http://localhost:5000/api/health`
- Status check: `http://localhost:5000/api/planner/status`

---

### 4. Run the Frontend Application

In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
The Vite development server will start on: **`http://localhost:5173`**

Open **[http://localhost:5173](http://localhost:5173)** in your browser!

---

## 📡 API Endpoints

### `GET /api/planner/status`
Returns API readiness and whether Gemini API key is configured.
```json
{
  "status": "ok",
  "geminiConfigured": true,
  "model": "gemini-2.5-flash",
  "message": "Gemini API is ready for live generation."
}
```

### `POST /api/planner/generate`
Generates a study plan based on user inputs.
**Request Body**:
```json
{
  "subjects": ["Mathematics", "Physics"],
  "examDate": "2026-11-15",
  "dailyHours": 5,
  "preferredTime": "Morning",
  "preparationLevel": "Intermediate",
  "importantTopics": "Calculus, Thermodynamics"
}
```
**Response**:
Returns full study plan containing `summary`, `subjectHours`, `dailyTimetable`, `priorityTopics`, `revisionSchedule`, `practiceSuggestions`, and `studyTasks`.
