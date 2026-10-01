from enum import Enum
from typing import Optional, Dict
from pydantic import BaseModel, Field


class DifficultyLevel(str, Enum):
    FOUNDATIONAL = "Foundational"
    STANDARD = "Standard"
    ADVANCED = "Advanced"


class LessonGenerateRequest(BaseModel):
    subject: str = Field(..., min_length=2, max_length=100, description="Subject domain (e.g. Physics)")
    topic: str = Field(..., min_length=2, max_length=150, description="Specific lesson topic (e.g. Newton's Third Law)")
    class_level: str = Field(..., min_length=1, max_length=50, description="Target grade or academic level (e.g. Grade 9)")
    duration_minutes: int = Field(45, ge=15, le=180, description="Instructional duration in minutes")
    learning_objective: str = Field(..., min_length=10, max_length=500, description="Specific measurable learning outcome")
    teaching_style: str = Field("Inquiry-based", min_length=2, max_length=100, description="Pedagogical delivery style")
    difficulty_level: DifficultyLevel = Field(DifficultyLevel.STANDARD, description="Cognitive difficulty calibration")


class SectionItem(BaseModel):
    title: str = Field(..., description="Section title")
    content: str = Field(..., description="Markdown or text content of the section")
    estimated_minutes: int = Field(5, ge=1, le=120, description="Recommended time budget in minutes")


class LessonSections(BaseModel):
    introduction: SectionItem
    learning_objectives: SectionItem
    concept_explanation: SectionItem
    examples: SectionItem
    classroom_activity: SectionItem
    discussion_questions: SectionItem
    assessment_questions: SectionItem
    conclusion: SectionItem


class LessonMetadata(BaseModel):
    subject: str
    topic: str
    class_level: str
    duration_minutes: int
    learning_objective: str
    teaching_style: str
    difficulty_level: DifficultyLevel


class LessonPackageResponse(BaseModel):
    id: str = Field(..., description="Unique package identifier")
    metadata: LessonMetadata
    sections: LessonSections


class SectionRegenerateRequest(BaseModel):
    section_key: str = Field(..., description="Key of the section to regenerate (e.g. classroom_activity)")
    lesson_context: LessonMetadata = Field(..., description="Context of the original lesson")
    current_content: str = Field("", description="Existing content of the section before regeneration")
    feedback_instruction: Optional[str] = Field(None, max_length=300, description="Specific teacher guidance for regeneration")


class SectionResponse(BaseModel):
    section_key: str
    title: str
    content: str
    estimated_minutes: int


class HealthResponse(BaseModel):
    status: str
    version: str
    gemini_configured: bool
