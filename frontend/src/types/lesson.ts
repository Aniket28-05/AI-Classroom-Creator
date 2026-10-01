export type DifficultyLevel = 'Foundational' | 'Standard' | 'Advanced';

export interface LessonInputParams {
  subject: string;
  topic: string;
  class_level: string;
  duration_minutes: number;
  learning_objective: string;
  teaching_style: string;
  difficulty_level: DifficultyLevel;
}

export interface SectionItem {
  title: string;
  content: string;
  estimated_minutes: number;
  is_edited?: boolean;
}

export interface LessonSections {
  introduction: SectionItem;
  learning_objectives: SectionItem;
  concept_explanation: SectionItem;
  examples: SectionItem;
  classroom_activity: SectionItem;
  discussion_questions: SectionItem;
  assessment_questions: SectionItem;
  conclusion: SectionItem;
}

export type SectionKey = keyof LessonSections;

export interface LessonPackage {
  id: string;
  metadata: LessonInputParams;
  sections: LessonSections;
  created_at?: string;
}

export interface SectionRegeneratePayload {
  section_key: string;
  lesson_context: LessonInputParams;
  current_content: string;
  feedback_instruction?: string;
}

export interface SectionResponse {
  section_key: string;
  title: string;
  content: string;
  estimated_minutes: number;
}

export interface HealthStatus {
  status: string;
  version: string;
  gemini_configured: boolean;
}
