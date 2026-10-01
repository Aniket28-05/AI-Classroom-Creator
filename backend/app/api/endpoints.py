from fastapi import APIRouter, HTTPException, status
from app.core.config import settings
from app.schemas.lesson import (
    HealthResponse,
    LessonGenerateRequest,
    LessonPackageResponse,
    SectionRegenerateRequest,
    SectionResponse,
)
from app.services.gemini_service import GeminiService

router = APIRouter()
gemini_service = GeminiService(api_key=settings.GEMINI_API_KEY, model_name=settings.GEMINI_MODEL)


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
    try:
        return await gemini_service.generate_lesson_package(request)
    except NotImplementedError as e:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail=str(e)
        )


@router.post("/lessons/regenerate-section", response_model=SectionResponse, tags=["Lessons"])
async def regenerate_section(request: SectionRegenerateRequest):
    """Endpoint for regenerating an individual lesson section with teacher feedback."""
    try:
        return await gemini_service.regenerate_section(request)
    except NotImplementedError as e:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail=str(e)
        )
