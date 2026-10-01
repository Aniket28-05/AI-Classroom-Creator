import logging
from fastapi import APIRouter, HTTPException, status
from app.core.config import settings
from app.schemas.lesson import (
    HealthResponse,
    LessonGenerateRequest,
    LessonPackageResponse,
    SectionRegenerateRequest,
    SectionResponse,
    LessonAskRequest,
    LessonAskResponse,
)
from app.services.gemini_service import GeminiService

logger = logging.getLogger(__name__)

router = APIRouter()


def get_gemini_service() -> GeminiService:
    return GeminiService(
        api_key=settings.GEMINI_API_KEY,
        model_name=settings.GEMINI_MODEL
    )


@router.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint to verify backend status and configuration."""
    return HealthResponse(
        status="healthy",
        version=settings.VERSION,
        gemini_configured=bool(settings.GEMINI_API_KEY.strip())
    )


@router.post("/lessons/generate", response_model=LessonPackageResponse, tags=["Lessons"])
async def generate_lesson(request: LessonGenerateRequest):
    """Endpoint for generating a complete structured 8-section lesson package."""
    service = get_gemini_service()
    try:
        return await service.generate_lesson_package(request)
    except Exception as e:
        logger.error(f"Error generating lesson package: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Gemini AI Generation failed: {str(e)}"
        )


@router.post("/lessons/regenerate-section", response_model=SectionResponse, tags=["Lessons"])
async def regenerate_section(request: SectionRegenerateRequest):
    """Endpoint for regenerating an individual lesson section with teacher feedback."""
    service = get_gemini_service()
    try:
        return await service.regenerate_section(request)
    except Exception as e:
        logger.error(f"Error regenerating section: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Gemini AI Section Regeneration failed: {str(e)}"
        )


@router.post("/lessons/ask", response_model=LessonAskResponse, tags=["Lessons"])
async def ask_question(request: LessonAskRequest):
    """Endpoint for teachers to ask any pedagogical question to the AI assistant."""
    service = get_gemini_service()
    try:
        answer = await service.ask_question(request.question, request.lesson_context)
        return LessonAskResponse(answer=answer)
    except Exception as e:
        logger.error(f"Error answering question: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Gemini AI Q&A failed: {str(e)}"
        )
