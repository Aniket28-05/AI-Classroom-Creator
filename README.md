# AI Classroom Creator – Lesson to Learning Package

> **Agenticthon 2026** | Problem ID: **PS-004** | Team: **AGT-002**

An AI-powered teaching assistant application that transforms lesson objectives into comprehensive, structured classroom learning packages—drastically reducing lesson preparation effort while keeping materials tightly aligned with curriculum standards, grade levels, and pedagogical goals.

---

## 📌 Problem Statement

Teachers frequently spend significant time preparing lesson plans, examples, classroom activities, assessments, and supporting material for the same topic. 

**AI Classroom Creator** solves this by generating structured, high-quality, and coherent lesson packages directly from teacher inputs:
- **Teacher Inputs**: Subject, Topic, Class / Grade Level, Duration of Lesson, Learning Objective, and Preferred Teaching Style.
- **Structured Package Output**:
  - Introduction & Hook
  - Clear Learning Objectives
  - Step-by-step Concept Explanation
  - Real-World Examples & Analogies
  - Interactive Classroom Activity
  - Facilitated Discussion Questions
  - Assessment Questions (Multi-level / Rubrics)
  - Concise Conclusion / Wrap-up
- **Adaptive Capabilities**:
  - Difficulty level adjustment.
  - Section-by-section regeneration.
  - Teacher review, editing, and customization before classroom use.
- **Extensions**:
  - AI-generated educational diagrams and visuals.
  - Multilingual support.
  - Diverse assessment formats.
  - Printable and exportable teacher handouts.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite |
| **Styling** | Tailwind CSS |
| **Backend** | Python 3.10+, FastAPI |
| **AI / LLM** | Google Gemini API (`gemini-1.5-flash` / Pro) |
| **Data Format** | JSON schema-validated payloads |

---

## 📂 Project Structure

```text
AI-Classroom-Creator/
├── frontend/          # React + Vite frontend application
├── backend/           # FastAPI backend & Gemini integration
├── .gitignore         # Comprehensive Git ignore rules
├── .env.example       # Template for environment variables
└── README.md          # Project documentation & overview
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+) & **npm**
- **Python** (v3.10+)
- **Google Gemini API Key** ([Google AI Studio](https://aistudio.google.com/))

### 1. Clone & Environment Configuration

```bash
git clone https://github.com/Aniket28-05/AI-Classroom-Creator.git
cd AI-Classroom-Creator
cp .env.example .env
```
Open `.env` and insert your `GEMINI_API_KEY`.

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies (once added)
# pip install -r requirements.txt

# Run the FastAPI development server
# uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd ../frontend
# Install dependencies (once initialized)
# npm install

# Start the Vite development server
# npm run dev
```

---

## 👥 Team & Submission Details

- **Event:** Agenticthon 2026
- **Problem ID:** PS-004
- **Team ID:** AGT-002
- **Category:** Generative AI
- **Members:**
  - `theaniketmishra2805@gmail.com`
  - `happy107206@gmail.com`

---

## 📄 License

This project is created for Agenticthon 2026.
