# System Architecture Document

## Project: AI Classroom Creator – Lesson to Learning Package
**Event:** Agenticthon 2026  
**Problem ID:** PS-004  
**Team ID:** AGT-002  

---

## 1. High-Level System Architecture

The AI Classroom Creator is designed as a streamlined, decoupled client-server web application optimized for hackathon speed, high reliability, and clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENT TIER                           │
│   React (Vite) + Tailwind CSS + Lucide Icons                │
│   - Lesson Parameter Form                                   │
│   - Structured Lesson Package Viewer (8 Sections)           │
│   - In-Place Section Editor & Regeneration Controller       │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / JSON REST
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                       BACKEND TIER                          │
│   Python 3.10+ / FastAPI Application Server                 │
│   - Pydantic v2 Request & Response Schema Validation        │
│   - Pedagogical Prompt Synthesizer & Guardrails             │
│   - Gemini Service Layer (JSON Schema Enforcement)          │
└──────────────────────────────┬──────────────────────────────┘
                               │ Google GenAI SDK (HTTPS)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         AI TIER                             │
│   Google Gemini API (gemini-1.5-flash / gemini-2.0-flash)   │
│   - Structured Output Mode (response_schema)                │
│   - Grounded Instructional Generation                       │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Core Principles
- **No Database Overhead:** For the MVP, state is held client-side. The backend remains stateless and lightweight.
- **Strict Server-Side AI Orchestration:** The frontend never connects directly to Gemini; the Gemini API key remains strictly server-side.
- **Enforced JSON Schemas:** Gemini is invoked with structured output constraints (`response_schema`), guaranteeing 100% predictable payloads.
- **Granular Modularity:** Full package generation and single-section regeneration use decoupled endpoints sharing unified Pydantic schemas.

---

## 2. Frontend Architecture (React + Vite + Tailwind CSS)

The frontend is a fast Single Page Application (SPA) built with React and Vite.

### Component Hierarchy

```
App
├── Header (Brand, Navigation, Reset action)
├── MainContainer
│   ├── LessonForm (Left / Top panel)
│   │   ├── Subject & Topic Inputs
│   │   ├── Class Level & Duration Selectors
│   │   ├── Learning Objective Textarea
│   │   ├── Teaching Style & Difficulty Selectors
│   │   └── "Generate Lesson Package" Button
│   │
│   └── LessonViewer (Right / Main panel)
│       ├── LessonSummaryHeader (Metadata overview & Export actions)
│       └── SectionList (Grid / Vertical Accordion of 8 Sections)
│           └── SectionCard (Rendered for each of the 8 mandatory sections)
│               ├── SectionHeader (Title, status badge: Original / Edited)
│               ├── SectionContent (Markdown / Formatted text view)
│               ├── InlineEditor (Active during edit mode)
│               └── SectionActions
│                   ├── "Edit" / "Save" Toggle
│                   ├── "Regenerate" Button (with custom instruction prompt)
│                   └── "Copy" Action
└── Footer / ToastNotifier (Status & error feedback)
```

### State Management
- **Local Application State:** Managed cleanly using React `useState` and `useCallback` hooks.
- **Lesson Package State:**
  ```typescript
  interface LessonPackage {
    id: string;
    inputs: LessonInputParams;
    sections: {
      introduction: SectionItem;
      learning_objectives: SectionItem;
      concept_explanation: SectionItem;
      examples: SectionItem;
      classroom_activity: SectionItem;
      discussion_questions: SectionItem;
      assessment_questions: SectionItem;
      conclusion: SectionItem;
    };
    created_at: string;
    is_edited: boolean;
  }
  ```
- No heavyweight external state libraries (e.g. Redux, Zustand) are required for MVP.

---

## 3. Backend Architecture (FastAPI + Pydantic v2)

The backend is built with FastAPI, providing asynchronous route execution, automated OpenAPI documentation, and strict type safety via Pydantic v2.

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                  # FastAPI app creation & CORS setup
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py            # Pydantic Settings (.env loader)
│   │   └── prompts.py           # Pedagogical system prompts & templates
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py           # Pydantic request & response models
│   └── services/
│       ├── __init__.py
│       └── gemini_service.py    # Gemini client, JSON schema invocation & parsing
├── requirements.txt
└── .env
```

---

## 4. AI Generation Flow (Full Lesson Package)

```
Teacher Submits Form
       │
       ▼
Frontend: POST /api/lessons/generate
       │ (JSON body containing the 7 parameters)
       ▼
FastAPI: Validate with LessonGenerateRequest schema
       │
       ▼
GeminiService: Assemble Prompt with Pedagogical Guardrails
       │ - Embed Subject, Topic, Grade Level, Duration, Objective, Style, Difficulty
       │ - Enforce JSON response_schema matching LessonPackageResponse
       ▼
Gemini API: Structured Output Generation
       │
       ▼
FastAPI: Parse and Validate raw JSON with Pydantic
       │ (Catches missing fields or invalid format before returning)
       ▼
Frontend: Receive validated LessonPackageResponse
       │
       ▼
UI: Render 8 formatted SectionCards ready for review & editing
```

---

## 5. Section Regeneration Flow (Granular Customization)

When a teacher finds a specific section (e.g., "Classroom Activity") unsuitable, they can regenerate **only** that section without re-running the entire model or discarding edits made to other sections.

```
Teacher clicks "Regenerate" on SectionCard
       │
       ├── Optional: Teacher enters specific feedback (e.g., "make it more hands-on")
       ▼
Frontend: POST /api/lessons/regenerate-section
       │ Body:
       │ {
       │   "lesson_context": { "subject": ..., "topic": ..., "learning_objective": ..., "difficulty": ... },
       │   "section_key": "classroom_activity",
       │   "current_content": "...",
       │   "feedback_instruction": "Use easily available household items"
       │ }
       ▼
FastAPI: Validate request with SectionRegenerateRequest
       │
       ▼
GeminiService: Targeted Section Prompt
       │ - Keeps existing lesson topic, objective, and grade level in context
       │ - Focuses exclusively on rewriting the requested section
       │ - Applies teacher feedback instruction
       ▼
Gemini API: Returns single SectionResponse
       │
       ▼
Frontend: Replaces only sections.classroom_activity in state
       │ - All other sections remain unchanged
       │ - Existing teacher edits to other cards are preserved
```

---

## 6. End-to-End Data Flow

```
┌──────────┐            ┌──────────┐             ┌────────────┐
│ Frontend │            │ FastAPI  │             │ Gemini API │
└────┬─────┘            └────┬─────┘             └─────┬──────┘
     │                       │                         │
     │ 1. POST /generate     │                         │
     │──────────────────────>│                         │
     │                       │ 2. Build prompt         │
     │                       │    & define schema      │
     │                       │ 3. generate_content()   │
     │                       │────────────────────────>│
     │                       │                         │
     │                       │ 4. Structured JSON response
     │                       │<────────────────────────│
     │                       │                         │
     │                       │ 5. Pydantic validation  │
     │ 6. Validated Package  │                         │
     │<──────────────────────│                         │
     │                       │                         │
     │ [Teacher edits text]  │                         │
     │                       │                         │
     │ 7. POST /regenerate   │                         │
     │    (single section)   │                         │
     │──────────────────────>│                         │
     │                       │ 8. Target section query │
     │                       │────────────────────────>│
     │                       │                         │
     │                       │ 9. Single section JSON  │
     │                       │<────────────────────────│
     │ 10. Updated Section   │                         │
     │<──────────────────────│                         │
     │                       │                         │
```

---

## 7. API Endpoint Plan

All endpoints communicate strictly via JSON over HTTP.

### 1. `POST /api/lessons/generate`
Generates the complete 8-section structured lesson package.

- **Request Body:**
  ```json
  {
    "subject": "Biology",
    "topic": "Photosynthesis",
    "class_level": "Grade 9",
    "duration_minutes": 45,
    "learning_objective": "Explain the light-dependent reactions of photosynthesis and where they occur inside the chloroplast.",
    "teaching_style": "Inquiry-based",
    "difficulty_level": "Standard"
  }
  ```

- **Response Body (200 OK):**
  ```json
  {
    "id": "les_9f81a7b2",
    "metadata": {
      "subject": "Biology",
      "topic": "Photosynthesis",
      "class_level": "Grade 9",
      "duration_minutes": 45,
      "learning_objective": "...",
      "teaching_style": "Inquiry-based",
      "difficulty_level": "Standard"
    },
    "sections": {
      "introduction": {
        "title": "Introduction & Hook",
        "content": "...",
        "estimated_minutes": 5
      },
      "learning_objectives": {
        "title": "Learning Objectives",
        "content": "...",
        "estimated_minutes": 3
      },
      "concept_explanation": {
        "title": "Concept Explanation",
        "content": "...",
        "estimated_minutes": 15
      },
      "examples": {
        "title": "Examples & Analogies",
        "content": "...",
        "estimated_minutes": 5
      },
      "classroom_activity": {
        "title": "Classroom Activity",
        "content": "...",
        "estimated_minutes": 10
      },
      "discussion_questions": {
        "title": "Discussion Questions",
        "content": "...",
        "estimated_minutes": 5
      },
      "assessment_questions": {
        "title": "Assessment Questions",
        "content": "...",
        "estimated_minutes": 5
      },
      "conclusion": {
        "title": "Conclusion & Wrap-Up",
        "content": "...",
        "estimated_minutes": 2
      }
    }
  }
  ```

### 2. `POST /api/lessons/regenerate-section`
Regenerates a single section while maintaining lesson coherence.

- **Request Body:**
  ```json
  {
    "section_key": "classroom_activity",
    "lesson_context": {
      "subject": "Biology",
      "topic": "Photosynthesis",
      "class_level": "Grade 9",
      "learning_objective": "...",
      "difficulty_level": "Standard"
    },
    "current_content": "...",
    "feedback_instruction": "Make the activity a small group simulation without requiring lab chemicals."
  }
  ```

- **Response Body (200 OK):**
  ```json
  {
    "section_key": "classroom_activity",
    "title": "Classroom Activity",
    "content": "...",
    "estimated_minutes": 10
  }
  ```

### 3. `GET /api/health`
Health check and environment configuration verification.

- **Response Body (200 OK):**
  ```json
  {
    "status": "healthy",
    "gemini_configured": true,
    "version": "1.0.0"
  }
  ```

---

## 8. Folder & File Architecture

```text
AI-Classroom-Creator/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── LessonForm.tsx
│   │   │   ├── LessonViewer.tsx
│   │   │   ├── SectionCard.tsx
│   │   │   └── ExportModal.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── lesson.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   └── endpoints.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   └── prompts.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── schemas.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── gemini_service.py
│   │   ├── __init__.py
│   │   └── main.py
│   ├── requirements.txt
│   └── .env
│
├── docs/
│   ├── PRD.md
│   └── ARCHITECTURE.md
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 9. Environment Variables and Secret Management

### Strict Isolation Rules
- **`GEMINI_API_KEY` is Server-Only:** Configured in `backend/.env` and parsed via `app.core.config.Settings`.
- **Zero Frontend Leakage:** The Vite frontend never references `GEMINI_API_KEY`. It only consumes `VITE_API_BASE_URL`.
- **Git Protection:** `.gitignore` explicitly prevents `.env` or any secret files from being committed.

```text
.env (Backend):
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-1.5-flash
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
CORS_ORIGINS=http://localhost:5173

.env (Frontend):
VITE_API_BASE_URL=http://localhost:8000
```

---

## 10. Error-Handling Strategy

1. **Input Validation Failures (HTTP 422):**
   - FastAPI / Pydantic automatically catches invalid parameters (e.g. empty topics, invalid duration) and returns structured validation errors.
2. **Gemini API Errors (HTTP 502 / 503):**
   - Caught in `GeminiService` (e.g. quota limits, network timeouts). Wrapped in standard JSON: `{"detail": "AI generation service temporarily unavailable. Please retry."}`.
3. **Structured Schema Parsing Failures (HTTP 500):**
   - If model output does not conform to the expected schema, the service retries once with temperature reduction or returns a clean, actionable error to the client rather than breaking the UI.
4. **Client-Side Graceful Degradation:**
   - The UI displays user-friendly error banners and keeps user inputs intact so they can retry without retyping.

---

## 11. Security Considerations

- **Prompt Injection Defense:** User inputs (Topic, Objective) are sanitized and framed within structured delimiters in the system prompt.
- **CORS Protection:** Configured with specific origins (`http://localhost:5173`) rather than `*` in production mode.
- **Rate Limiting & Payload Bounds:** String length limits on input fields in Pydantic models prevent excessive token abuse.

---

## 12. Deployment Architecture

- **Local Development:**
  - Backend: `uvicorn app.main:app --reload --port 8000`
  - Frontend: `npm run dev` (Vite dev server on `http://localhost:5173`)
- **Hackathon Demo Deployment:**
  - Frontend deployed on Vercel or Netlify.
  - Backend deployed as a container on Render / Google Cloud Run.
