# Product Requirements Document (PRD)

## Project: AI Classroom Creator – Lesson to Learning Package
**Event:** Agenticthon 2026  
**Problem ID:** PS-004  
**Team ID:** AGT-002  
**Status:** Approved for Implementation  

---

## 1. Product Overview

**AI Classroom Creator** is a Generative AI application designed for educators to convert core lesson parameters into a comprehensive, pedagogy-aligned classroom learning package. By accepting structured inputs such as subject, topic, class level, duration, learning objectives, and teaching style, the application generates a complete instructional package—including concept explanations, classroom activities, discussion prompts, assessments, and real-world examples.

The system emphasizes **tight alignment**, **teacher control**, **difficulty calibration**, and **in-place customizability**, empowering teachers to spend less time drafting repetitive materials and more time engaging students.

---

## 2. Problem Statement

Teachers frequently spend significant time preparing lesson plans, examples, classroom activities, assessments, and supporting material for the same topic. 

The challenge is to build a Generative AI application that can reduce this preparation effort while keeping the generated material strictly aligned with the teacher's intended learning outcome and student grade level.

The system must **not** produce disconnected or generic filler text; all generated activities, examples, and assessment questions must relate directly to the supplied topic, grade level, and learning objective.

---

## 3. Target User

- **Primary Users:** K-12 and secondary school teachers, subject educators, and instructional designers.
- **Secondary Users:** Teaching assistants, homeschool educators, and student teachers seeking lesson scaffolding.

---

## 4. User Goal

Quickly generate, review, fine-tune, and finalize a comprehensive, classroom-ready lesson package that directly satisfies syllabus standards, matches student cognitive levels, and respects teacher-specified pedagogy—all within minutes rather than hours.

---

## 5. Core User Flow

```
[1. Input Parameters] 
       │ (Subject, Topic, Class Level, Duration, Objective, Style, Difficulty)
       ▼
[2. Generate Package] 
       │ (FastAPI backend calls Gemini with strict JSON schema)
       ▼
[3. Review Structured Lesson Package]
       │ (Inspect 8 distinct, formatted lesson sections)
       ▼
[4. Refine / Section-by-Section Regeneration]
       │ (Teacher regenerates specific sections if unsuitable, without losing others)
       ▼
[5. Teacher In-Place Editing]
       │ (Directly edit, adjust, or supplement any section text)
       ▼
[6. Finalize & Export]
       │ (Export formatted package / printable teacher handout)
```

---

## 6. Required Inputs (7 Core Inputs)

The application must collect and validate the following 7 parameters from the teacher:

| # | Input Field | Description | Example Values |
|---|---|---|---|
| 1 | **Subject** | Broad educational domain or discipline | Physics, Mathematics, History, Biology, English |
| 2 | **Topic** | The specific concept or unit of study | Photosynthesis, Newton's Third Law, French Revolution |
| 3 | **Class Level** | Target grade or student academic level | Grade 5, Grade 8, Grade 10, Undergraduate |
| 4 | **Lesson Duration** | Time allocated for the instructional period | 30 minutes, 45 minutes, 60 minutes, 90 minutes |
| 5 | **Learning Objective** | Specific knowledge or skill students must demonstrate | "Students will be able to explain how chlorophyll captures light and write the chemical equation." |
| 6 | **Teaching Style** | Pedagogical approach guiding delivery | Inquiry-based, Direct Instruction, Socratic Dialogue, Hands-on / Experiential |
| 7 | **Difficulty Level** | Cognitive complexity & vocabulary level | Foundational / Beginner, Standard / Grade-Level, Advanced / Enriched |

---

## 7. Required Generated Content (8 Mandatory Sections)

The generated learning package must contain 8 coherent, structured sections:

1. **Introduction & Hook**  
   An engaging lesson opener, real-world hook, or introductory context to capture student curiosity and activate prior knowledge.
2. **Learning Objectives**  
   Clear, student-facing target competencies aligned with the teacher's stated goal (action verbs, measurable outcomes).
3. **Concept Explanation**  
   Step-by-step, age-appropriate conceptual breakdown using pedagogical explanations adapted to the selected class level.
4. **Examples & Analogies**  
   Concrete, relatable everyday analogies and worked examples illustrating the core concept.
5. **Classroom Activity**  
   A structured, time-budgeted interactive exercise (individual, paired, or group) directly reinforcing the concept within the lesson duration.
6. **Discussion Questions**  
   Open-ended, thought-provoking questions designed to stimulate classroom debate and check understanding.
7. **Assessment Questions**  
   Targeted checks for understanding (formative questions, exit ticket problems, or short quiz items) directly evaluating the stated learning objective.
8. **Short Conclusion & Recap**  
   A concise lesson wrap-up summarizing key takeaways and establishing continuity for subsequent topics.

---

## 8. Core Functional Requirements (REQUIRED MVP)

### FR-1: Structured Lesson Generation
- The system must generate all 8 mandatory sections in a single, coherent package.
- Output must conform to a strict JSON structure validated by the backend before delivery to the frontend.

### FR-2: Contextual & Pedagogical Alignment
- Generated classroom activities and assessment questions must relate directly to the user's supplied **Topic** and **Learning Objective**.
- The system must prevent generic, boilerplate, or off-topic responses through explicit prompt constraints.

### FR-3: Difficulty Calibration
- The system must adjust vocabulary, depth of explanation, and cognitive complexity based on the teacher's selected **Class Level** and **Difficulty Level**.

### FR-4: Granular Section Regeneration
- Teachers must be able to independently regenerate any individual section (e.g., re-run only the "Classroom Activity" or "Assessment Questions") if the initial generation is unsuitable.
- Section regeneration must retain the context of the overarching lesson without altering or resetting other existing sections.

### FR-5: In-Place Teacher Review and Editing
- Teachers must be able to directly edit text across any section in the user interface.
- Manual teacher edits must be preserved during the session and reflected in exports.

---

## 9. Optional Extensions (OPTIONAL / EXTENSION SCOPE)

The problem statement identifies the following potential extensions. These are explicitly partitioned from MVP requirements:

- **EXT-1: AI-Generated Diagrams & Educational Images**  
  Integration of visual diagrams (e.g., Mermaid.js concept maps, SVG illustrations, or generative image prompts) to accompany the concept explanation.
- **EXT-2: Multilingual Teaching Material**  
  Ability to generate or translate lesson plans into regional or alternative languages (e.g., Hindi, Spanish, French).
- **EXT-3: Diverse Assessment Formats**  
  Expanded assessment options including Multiple Choice Questions (MCQs), rubrics, fill-in-the-blank, and tiered difficulty worksheets.
- **EXT-4: Printable Teacher Handout**  
  A print-ready, clean document layout (or PDF download) formatted specifically for classroom distribution or administrative filing.

---

## 10. Scope Matrix

| Feature | Category | Target Release |
|---|---|---|
| 7-Field Lesson Input Form | **REQUIRED** | MVP (Phase 1) |
| Complete 8-Section Lesson Generation | **REQUIRED** | MVP (Phase 1) |
| Strict JSON Schema Validation | **REQUIRED** | MVP (Phase 1) |
| Alignment Guardrails (Objective & Topic) | **REQUIRED** | MVP (Phase 1) |
| Difficulty & Class Level Adaptation | **REQUIRED** | MVP (Phase 1) |
| Single-Section Independent Regeneration | **REQUIRED** | MVP (Phase 1) |
| In-place Teacher Review & Text Editing | **REQUIRED** | MVP (Phase 1) |
| Printable Teacher Handout / Clean Export | **OPTIONAL** | Stretch (Phase 2) |
| Diverse Assessment Formats (MCQ/Rubric) | **OPTIONAL** | Stretch (Phase 2) |
| Educational Diagrams / Visuals | **OPTIONAL** | Stretch (Phase 2) |
| Multilingual Output Support | **OPTIONAL** | Stretch (Phase 2) |

---

## 11. Success Criteria

1. **Alignment Verification:** 100% of generated classroom activities and assessment items directly target the specified learning objective and topic.
2. **Generation Latency:** Full 8-section lesson package generated and rendered in under 15 seconds.
3. **Regeneration Precision:** Single-section regeneration completes in under 6 seconds without modifying untouched sections.
4. **Usability:** A teacher can enter parameters and obtain an editable, formatted plan in fewer than 3 clicks.
5. **Reliability:** 0 unhandled JSON parsing failures returned to the client.

---

## 12. Non-Goals (Out of Scope for Hackathon)

- **No User Account / Auth System:** No sign-up, sign-in, or JWT session management for MVP.
- **No Database Setup:** No SQL/NoSQL persistence required for MVP (client state and local exports suffice).
- **No LMS Integration:** No Google Classroom, Canvas, or Moodle sync.
- **No Grading or Student Submission Handling:** The tool is focused exclusively on teacher preparation.
