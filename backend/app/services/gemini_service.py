"""Gemini AI Service Interface.

Note: Gemini integration and prompts will be implemented in the AI Integration task.
Fake AI responses are strictly prohibited per design guidelines.
"""
from app.schemas.lesson import LessonGenerateRequest, LessonPackageResponse, SectionRegenerateRequest, SectionResponse


class GeminiService:
    def __init__(self, api_key: str = "", model_name: str = "gemini-1.5-flash"):
        self.api_key = api_key
        self.model_name = model_name

    async def generate_lesson_package(self, request: LessonGenerateRequest) -> LessonPackageResponse:
        """Generates a complete structured 8-section lesson package using Gemini structured output."""
        raise NotImplementedError("Gemini integration will be implemented in Task 3.")

    async def regenerate_section(self, request: SectionRegenerateRequest) -> SectionResponse:
        """Regenerates a single targeted lesson section using Gemini structured output."""
        raise NotImplementedError("Section regeneration will be implemented in Task 3.")
