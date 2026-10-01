import React, { useState, useEffect } from 'react';
import { LessonForm } from '../components/lesson/LessonForm';
import { LessonViewer } from '../components/lesson/LessonViewer';
import { LessonLoadingState } from '../components/lesson/LessonLoadingState';
import { Alert } from '../components/common/Alert';
import { api } from '../services/api';
import {
  LessonInputParams,
  LessonPackage,
  SectionKey,
  HealthStatus,
} from '../types/lesson';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [lessonPackage, setLessonPackage] = useState<LessonPackage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [regeneratingKey, setRegeneratingKey] = useState<SectionKey | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [health, setHealth] = useState<HealthStatus | null>(null);

  // Check backend health on initial load
  useEffect(() => {
    let isMounted = true;
    api
      .checkHealth()
      .then((data) => {
        if (isMounted) setHealth(data);
      })
      .catch(() => {
        if (isMounted) {
          setHealth({ status: 'unreachable', version: '0.0.0', gemini_configured: false });
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Form Submit Handler -> calls real API
  const handleGenerate = async (params: LessonInputParams) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.generateLesson(params);
      setLessonPackage(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to connect to the backend server. Please verify the API is running.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Section in-place save handler -> updates local lesson package state
  const handleSaveContent = (key: SectionKey, newContent: string) => {
    if (!lessonPackage) return;

    setLessonPackage({
      ...lessonPackage,
      sections: {
        ...lessonPackage.sections,
        [key]: {
          ...lessonPackage.sections[key],
          content: newContent,
          is_edited: true,
        },
      },
    });
  };

  // Section regeneration handler -> calls real backend API
  const handleRegenerateSection = async (key: SectionKey, feedback?: string) => {
    if (!lessonPackage) return;

    setRegeneratingKey(key);
    setErrorMessage(null);

    try {
      const response = await api.regenerateSection({
        section_key: key,
        lesson_context: lessonPackage.metadata,
        current_content: lessonPackage.sections[key].content,
        feedback_instruction: feedback,
      });

      setLessonPackage({
        ...lessonPackage,
        sections: {
          ...lessonPackage.sections,
          [key]: {
            ...lessonPackage.sections[key],
            title: response.title || lessonPackage.sections[key].title,
            content: response.content,
            estimated_minutes: response.estimated_minutes || lessonPackage.sections[key].estimated_minutes,
            is_edited: false,
          },
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(`Section regeneration error: ${err.message}`);
      } else {
        setErrorMessage('Failed to regenerate section from backend API.');
      }
    } finally {
      setRegeneratingKey(null);
    }
  };

  const handleNewLesson = () => {
    setLessonPackage(null);
    setErrorMessage(null);
  };

  return (
    <div className="space-y-8">
      {/* Backend Status Notification Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2.5 rounded-lg border border-[#EFEFEF] bg-white text-xs">
        <div className="flex items-center gap-2">
          {health?.status === 'healthy' ? (
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
              FastAPI Backend Connected (v{health.version})
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-700 font-medium">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
              Backend API Disconnected
            </span>
          )}
          <span className="text-[#CACBCE]">•</span>
          <span className="text-[#6E727A]">
            AI Service Status:{' '}
            {health?.gemini_configured ? (
              <strong className="text-emerald-700">Configured</strong>
            ) : (
              <span className="text-[#6E727A]">API Key Awaiting in backend/.env</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#6E727A]">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Agenticthon 2026 • Problem ID: PS-004</span>
        </div>
      </div>

      {/* Global Error Banner */}
      {errorMessage && (
        <Alert
          variant="error"
          title="API Response Notice"
          onDismiss={() => setErrorMessage(null)}
        >
          {errorMessage}
        </Alert>
      )}

      {/* Main Flow: Form vs Loading vs LessonViewer */}
      {isLoading ? (
        <LessonLoadingState />
      ) : lessonPackage ? (
        <LessonViewer
          lessonPackage={lessonPackage}
          onNewLesson={handleNewLesson}
          onSaveContent={handleSaveContent}
          onRegenerateSection={handleRegenerateSection}
          regeneratingKey={regeneratingKey}
        />
      ) : (
        <div className="space-y-8">
          {/* Header context */}
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-[#141517]">
              AI Classroom Creator
            </h1>
            <p className="text-sm text-[#4F5259] leading-relaxed">
              Generate structured, grade-adapted classroom learning packages strictly aligned with
              curriculum standards and your intended learning outcome. Fill in the parameters below
              to generate the complete 8-section package.
            </p>
          </div>

          <LessonForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};
