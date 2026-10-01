import React, { useState } from 'react';
import { HeroSection } from '../components/lesson/HeroSection';
import { LessonForm } from '../components/lesson/LessonForm';
import { FrameworkOverview } from '../components/lesson/FrameworkOverview';
import { LessonViewer } from '../components/lesson/LessonViewer';
import { LessonLoadingState } from '../components/lesson/LessonLoadingState';
import { Alert } from '../components/common/Alert';
import { api } from '../services/api';
import {
  LessonInputParams,
  LessonPackage,
  SectionKey,
} from '../types/lesson';

interface HomePageProps {
  onStateChange?: (hasLesson: boolean) => void;
  onNewLessonRegister?: (callback: () => void) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStateChange,
  onNewLessonRegister,
}) => {
  const [lessonPackage, setLessonPackage] = useState<LessonPackage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [regeneratingKey, setRegeneratingKey] = useState<SectionKey | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [presetData, setPresetData] = useState<Partial<LessonInputParams> | null>(null);

  // Form Submit Handler -> calls real backend API
  const handleGenerate = async (params: LessonInputParams) => {
    setIsLoading(true);
    setErrorMessage(null);

    // Scroll smoothly to loading area
    window.scrollTo({ top: 180, behavior: 'smooth' });

    try {
      const response = await api.generateLesson(params);
      setLessonPackage(response);
      onStateChange?.(true);
      // Smooth scroll to top of generated lesson
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Unable to communicate with the curriculum engine. Please ensure the backend server is running.');
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
        setErrorMessage(`Section regeneration failed: ${err.message}`);
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
    onStateChange?.(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Expose reset callback to parent if needed
  React.useEffect(() => {
    onNewLessonRegister?.(handleNewLesson);
  }, [onNewLessonRegister]);

  const handleStarterSelect = (topicData: Partial<LessonInputParams>) => {
    setPresetData(topicData);
    const studioEl = document.getElementById('studio-section');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartCreating = () => {
    const studioEl = document.getElementById('studio-section');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12">
      {/* Global Error Banner if API error occurs */}
      {errorMessage && (
        <Alert
          variant="error"
          title="Engine Notice"
          onDismiss={() => setErrorMessage(null)}
          className="sticky top-20 z-40 max-w-3xl mx-auto shadow-elevated"
        >
          {errorMessage}
        </Alert>
      )}

      {/* Main Flow: Loading Workspace vs Generated Lesson vs Studio Creation Flow */}
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
        <div className="space-y-16">
          {/* Section 1: Landing / Hero */}
          <HeroSection
            onSelectTopic={handleStarterSelect}
            onStartCreating={handleStartCreating}
          />

          {/* Section 2: Create Lesson (Studio Creation Experience) */}
          <LessonForm
            onSubmit={handleGenerate}
            isLoading={isLoading}
            presetData={presetData}
          />

          {/* Section 3: 8-Section Pedagogical Framework Overview */}
          <FrameworkOverview />
        </div>
      )}
    </div>
  );
};
