"""Gemini AI Service Implementation.

Integrates with Google Gemini API via REST with structured output schema support.
Handles complete 8-section lesson generation, targeted section regeneration,
and interactive question answering for educators.
"""
import json
import logging
import uuid
from typing import Optional, Dict, List
import httpx

from app.schemas.lesson import (
    LessonGenerateRequest,
    LessonPackageResponse,
    LessonMetadata,
    LessonSections,
    SectionItem,
    SectionRegenerateRequest,
    SectionResponse,
)

logger = logging.getLogger(__name__)

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models"


class GeminiService:
    def __init__(self, api_key: str = "", model_name: str = "gemini-3.5-flash-lite"):
        self.api_key = api_key
        self.model_name = model_name or "gemini-3.5-flash-lite"
        # Ordered list of models to try if high-traffic or capacity limits occur
        self.candidate_models = [
            self.model_name,
            "gemini-3.5-flash-lite",
            "gemini-3.1-flash-lite",
            "gemini-3-flash-preview",
        ]
        # De-duplicate while preserving order
        seen = set()
        self.candidate_models = [m for m in self.candidate_models if not (m in seen or seen.add(m))]

    async def _post_gemini(self, payload: dict, timeout: float = 60.0) -> dict:
        """Helper to call Gemini API with fallback over candidate models."""
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY is not configured in backend/.env")

        last_error = None
        for model in self.candidate_models:
            url = f"{GEMINI_API_URL}/{model}:generateContent?key={self.api_key}"
            try:
                async with httpx.AsyncClient(timeout=timeout) as client:
                    response = await client.post(url, json=payload)
                    if response.status_code == 200:
                        return response.json()
                    else:
                        error_detail = response.text
                        logger.warning(f"Model {model} returned HTTP {response.status_code}: {error_detail[:150]}")
                        last_error = f"HTTP {response.status_code} from {model}: {error_detail}"
            except Exception as e:
                logger.warning(f"Error calling {model}: {e}")
                last_error = str(e)

        raise RuntimeError(f"All Gemini models failed. Last error: {last_error}")

    async def generate_lesson_package(self, request: LessonGenerateRequest) -> LessonPackageResponse:
        """Generates a complete structured 8-section lesson package using Gemini structured output."""
        prompt = f"""You are a master pedagogical architect and curriculum designer.
Create a comprehensive, classroom-ready 8-section lesson package based on these parameters:

- Subject: {request.subject}
- Topic: {request.topic}
- Class Level: {request.class_level}
- Total Lesson Duration: {request.duration_minutes} minutes
- Teaching Style: {request.teaching_style}
- Difficulty Level: {request.difficulty_level.value}
- Core Learning Objective: {request.learning_objective}

INSTRUCTIONAL REQUIREMENTS:
1. Provide actual, rich, detailed educational content (not outlines, placeholders, or summaries).
2. The 8 sections must be:
   - introduction: Title must be 'Introduction & Hook'. Engaging real-world hook, context setting, and prior knowledge activation.
   - learning_objectives: Title must be 'Learning Objectives'. Explicit, observable Bloom's taxonomy outcomes students will master.
   - concept_explanation: Title must be 'Concept Explanation'. Thorough conceptual breakdown, models, core definitions, and mechanisms.
   - examples: Title must be 'Worked Examples'. Step-by-step worked examples with complete problem solving and guided scaffolding.
   - classroom_activity: Title must be 'Classroom Activity'. Interactive hands-on experiment, group protocol, or simulation with materials and steps.
   - discussion_questions: Title must be 'Discussion Questions'. 3-5 thought-provoking Socratic inquiry questions with teacher discussion notes.
   - assessment_questions: Title must be 'Assessment & Checks'. Formative and evaluative check questions WITH comprehensive answers and scoring criteria.
   - conclusion: Title must be 'Conclusion & Takeaway'. Key conceptual takeaways, summary synthesis, and connection to future topics.
3. The sum of estimated_minutes across all 8 sections should approximately equal {request.duration_minutes} minutes.
"""

        schema = {
            "type": "OBJECT",
            "properties": {
                "introduction": {
                    "type": "OBJECT",
                    "properties": {
                        "title": {"type": "STRING"},
                        "content": {"type": "STRING"},
                        "estimated_minutes": {"type": "INTEGER"},
                    },
                    "required": ["title", "content", "estimated_minutes"],
                },
                "learning_objectives": {
                    "type": "OBJECT",
                    "properties": {
                        "title": {"type": "STRING"},
                        "content": {"type": "STRING"},
                        "estimated_minutes": {"type": "INTEGER"},
                    },
                    "required": ["title", "content", "estimated_minutes"],
                },
                "concept_explanation": {
                    "type": "OBJECT",
                    "properties": {
                        "title": {"type": "STRING"},
                        "content": {"type": "STRING"},
                        "estimated_minutes": {"type": "INTEGER"},
                    },
                    "required": ["title", "content", "estimated_minutes"],
                },
                "examples": {
                    "type": "OBJECT",
                    "properties": {
                        "title": {"type": "STRING"},
                        "content": {"type": "STRING"},
                        "estimated_minutes": {"type": "INTEGER"},
                    },
                    "required": ["title", "content", "estimated_minutes"],
                },
                "classroom_activity": {
                    "type": "OBJECT",
                    "properties": {
                        "title": {"type": "STRING"},
                        "content": {"type": "STRING"},
                        "estimated_minutes": {"type": "INTEGER"},
                    },
                    "required": ["title", "content", "estimated_minutes"],
                },
                "discussion_questions": {
                    "type": "OBJECT",
                    "properties": {
                        "title": {"type": "STRING"},
                        "content": {"type": "STRING"},
                        "estimated_minutes": {"type": "INTEGER"},
                    },
                    "required": ["title", "content", "estimated_minutes"],
                },
                "assessment_questions": {
                    "type": "OBJECT",
                    "properties": {
                        "title": {"type": "STRING"},
                        "content": {"type": "STRING"},
                        "estimated_minutes": {"type": "INTEGER"},
                    },
                    "required": ["title", "content", "estimated_minutes"],
                },
                "conclusion": {
                    "type": "OBJECT",
                    "properties": {
                        "title": {"type": "STRING"},
                        "content": {"type": "STRING"},
                        "estimated_minutes": {"type": "INTEGER"},
                    },
                    "required": ["title", "content", "estimated_minutes"],
                },
            },
            "required": [
                "introduction",
                "learning_objectives",
                "concept_explanation",
                "examples",
                "classroom_activity",
                "discussion_questions",
                "assessment_questions",
                "conclusion",
            ],
        }

        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "response_mime_type": "application/json",
                "response_schema": schema,
                "temperature": 0.4,
            },
        }

        data = await self._post_gemini(payload, timeout=90.0)
        raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
        parsed = json.loads(raw_text)

        sections = LessonSections(
            introduction=SectionItem(**parsed["introduction"]),
            learning_objectives=SectionItem(**parsed["learning_objectives"]),
            concept_explanation=SectionItem(**parsed["concept_explanation"]),
            examples=SectionItem(**parsed["examples"]),
            classroom_activity=SectionItem(**parsed["classroom_activity"]),
            discussion_questions=SectionItem(**parsed["discussion_questions"]),
            assessment_questions=SectionItem(**parsed["assessment_questions"]),
            conclusion=SectionItem(**parsed["conclusion"]),
        )

        metadata = LessonMetadata(
            subject=request.subject,
            topic=request.topic,
            class_level=request.class_level,
            duration_minutes=request.duration_minutes,
            learning_objective=request.learning_objective,
            teaching_style=request.teaching_style,
            difficulty_level=request.difficulty_level,
        )

        return LessonPackageResponse(
            id=str(uuid.uuid4()),
            metadata=metadata,
            sections=sections,
        )

    async def regenerate_section(self, request: SectionRegenerateRequest) -> SectionResponse:
        """Regenerates a single targeted lesson section using Gemini structured output."""
        context = request.lesson_context
        feedback = request.feedback_instruction or "Enhance depth, clarity, and pedagogical effectiveness."

        prompt = f"""You are a master teacher and curriculum specialist.
Regenerate specifically the '{request.section_key}' section for the following lesson:

LESSON CONTEXT:
- Subject: {context.subject}
- Topic: {context.topic}
- Class Level: {context.class_level}
- Duration Budget: {context.duration_minutes} minutes
- Style: {context.teaching_style}
- Difficulty: {context.difficulty_level.value}
- Learning Objective: {context.learning_objective}

PREVIOUS SECTION CONTENT:
{request.current_content}

TEACHER MODIFICATION INSTRUCTION:
{feedback}

Generate an improved, high-quality replacement for this section that fully respects the teacher's instructions.
"""

        schema = {
            "type": "OBJECT",
            "properties": {
                "title": {"type": "STRING"},
                "content": {"type": "STRING"},
                "estimated_minutes": {"type": "INTEGER"},
            },
            "required": ["title", "content", "estimated_minutes"],
        }

        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "response_mime_type": "application/json",
                "response_schema": schema,
                "temperature": 0.5,
            },
        }

        data = await self._post_gemini(payload, timeout=60.0)
        raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
        parsed = json.loads(raw_text)

        default_titles = {
            "introduction": "Introduction & Hook",
            "learning_objectives": "Learning Objectives",
            "concept_explanation": "Concept Explanation",
            "examples": "Worked Examples",
            "classroom_activity": "Classroom Activity",
            "discussion_questions": "Discussion Questions",
            "assessment_questions": "Assessment & Checks",
            "conclusion": "Conclusion & Takeaway",
        }
        title = parsed.get("title") or default_titles.get(request.section_key, request.section_key.replace("_", " ").title())

        return SectionResponse(
            section_key=request.section_key,
            title=title,
            content=parsed["content"],
            estimated_minutes=parsed.get("estimated_minutes", 5),
        )

    async def ask_question(self, question: str, context: Optional[Dict] = None) -> str:
        """Answers any pedagogical or lesson-specific question from the teacher."""
        context_str = ""
        if context:
            context_str = f"""
CURRENT LESSON CONTEXT:
- Subject: {context.get('subject', 'General')}
- Topic: {context.get('topic', 'General')}
- Grade: {context.get('class_level', 'Not specified')}
- Objective: {context.get('learning_objective', 'Not specified')}
"""

        prompt = f"""You are an expert AI Master Teacher and Pedagogical Assistant.
{context_str}
TEACHER'S QUESTION:
{question}

Provide a clear, practical, educator-grade answer with specific examples, strategies, or answers where applicable.
Use clean, formatted markdown.
"""

        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.6,
            },
        }

        data = await self._post_gemini(payload, timeout=45.0)
        return data["candidates"][0]["content"]["parts"][0]["text"]
