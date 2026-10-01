import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { LessonInputParams, DifficultyLevel } from '../../types/lesson';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface LessonFormProps {
  onSubmit: (params: LessonInputParams) => void;
  isLoading: boolean;
  presetData?: Partial<LessonInputParams> | null;
}

export const LessonForm: React.FC<LessonFormProps> = ({
  onSubmit,
  isLoading,
  presetData,
}) => {
  const [formData, setFormData] = useState<LessonInputParams>({
    subject: '',
    topic: '',
    class_level: 'Grade 9',
    duration_minutes: 45,
    learning_objective: '',
    teaching_style: 'Inquiry-based',
    difficulty_level: 'Standard',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LessonInputParams, string>>>({});

  // Sync preset data if selected from hero or external trigger
  useEffect(() => {
    if (presetData) {
      setFormData((prev) => ({
        ...prev,
        ...presetData,
      }));
      setErrors({});
    }
  }, [presetData]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LessonInputParams, string>> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required (e.g., Biology, Physics, World History).';
    } else if (formData.subject.trim().length < 2) {
      newErrors.subject = 'Subject must be at least 2 characters.';
    }

    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required (e.g., Photosynthesis, Newton’s Laws).';
    } else if (formData.topic.trim().length < 2) {
      newErrors.topic = 'Topic must be at least 2 characters.';
    }

    if (!formData.learning_objective.trim()) {
      newErrors.learning_objective = 'Learning objective is required.';
    } else if (formData.learning_objective.trim().length < 15) {
      newErrors.learning_objective = 'Please provide a descriptive objective (minimum 15 characters).';
    }

    if (formData.duration_minutes < 15 || formData.duration_minutes > 180) {
      newErrors.duration_minutes = 'Duration must be between 15 and 180 minutes.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const durationOptions = [30, 45, 60, 90];

  const difficultyLevels: { level: DifficultyLevel; desc: string }[] = [
    { level: 'Foundational', desc: 'Core fundamentals & high scaffolding' },
    { level: 'Standard', desc: 'Grade-level rigor & standard pacing' },
    { level: 'Advanced', desc: 'Enriched conceptual & analytical depth' },
  ];

  return (
    <section id="studio-section" className="space-y-6 pt-4 pb-12">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent">
            <Sliders className="h-3.5 w-3.5" />
            <span>CURRICULUM ARCHITECTURE STUDIO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-warm-white">
            Calibrate Lesson Parameters
          </h2>
          <p className="text-xs sm:text-sm text-warm-muted max-w-2xl leading-relaxed">
            Configure your curriculum scope, time allocation, and pedagogical style. Every section will be structured around these parameters.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-warm-muted bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.08]">
            7 Calibrated Parameters
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Left Workspace Column */}
          <div className="lg:col-span-8 space-y-5">
            {/* Step 1: Subject & Topic */}
            <Card variant="default" padding="md" className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-semibold text-accent px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                    STEP 1
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-ivory">
                    Academic Scope & Topic
                  </h3>
                </div>
                <span className="text-[11px] text-warm-dim">Required</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Academic Subject"
                  required
                  placeholder="e.g. Physics, Cellular Biology, Economics"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: undefined });
                  }}
                  error={errors.subject}
                  disabled={isLoading}
                  leftIcon={<BookOpen className="h-4 w-4" />}
                />

                <Input
                  label="Lesson Topic"
                  required
                  placeholder="e.g. Photosynthesis, Newton's Third Law"
                  value={formData.topic}
                  onChange={(e) => {
                    setFormData({ ...formData, topic: e.target.value });
                    if (errors.topic) setErrors({ ...errors, topic: undefined });
                  }}
                  error={errors.topic}
                  disabled={isLoading}
                  leftIcon={<Compass className="h-4 w-4" />}
                />
              </div>
            </Card>

            {/* Step 2: Classroom & Pedagogical Calibration */}
            <Card variant="default" padding="md" className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-semibold text-accent px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                    STEP 2
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-ivory">
                    Pedagogical Calibration & Time Allocation
                  </h3>
                </div>
                <span className="text-[11px] text-warm-dim">Adaptive Framework</span>
              </div>

              {/* Class Level & Duration Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Target Class Level"
                  required
                  value={formData.class_level}
                  onChange={(e) => setFormData({ ...formData, class_level: e.target.value })}
                  options={[
                    { value: 'Grade 5', label: 'Grade 5 (Primary)' },
                    { value: 'Grade 6', label: 'Grade 6 (Middle School)' },
                    { value: 'Grade 7', label: 'Grade 7 (Middle School)' },
                    { value: 'Grade 8', label: 'Grade 8 (Middle School)' },
                    { value: 'Grade 9', label: 'Grade 9 (Secondary)' },
                    { value: 'Grade 10', label: 'Grade 10 (Secondary)' },
                    { value: 'Grade 11', label: 'Grade 11 (Higher Secondary)' },
                    { value: 'Grade 12', label: 'Grade 12 (Higher Secondary)' },
                    { value: 'Undergraduate', label: 'Undergraduate (Introductory)' },
                  ]}
                  disabled={isLoading}
                />

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-warm-muted">
                    Time Budget
                    <span className="text-accent ml-1">*</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {durationOptions.map((mins) => (
                      <button
                        type="button"
                        key={mins}
                        onClick={() => setFormData({ ...formData, duration_minutes: mins })}
                        disabled={isLoading}
                        className={cn(
                          'py-2 rounded-lg text-xs font-semibold transition-all border text-center',
                          formData.duration_minutes === mins
                            ? 'bg-accent text-canvas border-accent shadow-glow'
                            : 'bg-surface-subtle text-warm-muted border-white/[0.08] hover:text-warm-white hover:border-white/[0.16]'
                        )}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Difficulty Level Chips */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold tracking-wider uppercase text-warm-muted">
                  Cognitive Tier & Difficulty
                  <span className="text-accent ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {difficultyLevels.map(({ level, desc }) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => setFormData({ ...formData, difficulty_level: level })}
                      disabled={isLoading}
                      className={cn(
                        'p-3 rounded-lg text-left transition-all border',
                        formData.difficulty_level === level
                          ? 'bg-surface-elevated border-accent/60 shadow-glow'
                          : 'bg-surface-subtle/80 border-white/[0.06] hover:border-white/[0.14]'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className={cn('text-xs font-semibold', formData.difficulty_level === level ? 'text-accent' : 'text-warm-white')}>
                          {level}
                        </span>
                        {formData.difficulty_level === level && (
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        )}
                      </div>
                      <p className="text-[11px] text-warm-dim mt-1 leading-normal">
                        {desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Teaching Style */}
              <div className="pt-1">
                <Select
                  label="Instructional Delivery Style"
                  required
                  value={formData.teaching_style}
                  onChange={(e) => setFormData({ ...formData, teaching_style: e.target.value })}
                  options={[
                    { value: 'Inquiry-based', label: 'Inquiry-based (Questioning, Exploration & Discovery)' },
                    { value: 'Direct Instruction', label: 'Direct Instruction (Structured Lecture & Worked Demonstrations)' },
                    { value: 'Socratic Dialogue', label: 'Socratic Dialogue (Guided Questioning & Critical Discussion)' },
                    { value: 'Experiential / Hands-on', label: 'Experiential / Hands-on (Lab Exercises & Physical Models)' },
                  ]}
                  disabled={isLoading}
                />
              </div>
            </Card>

            {/* Step 3: Learning Objective */}
            <Card variant="default" padding="md" className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-semibold text-accent px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                    STEP 3
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-ivory">
                    Intended Learning Objective
                  </h3>
                </div>
                <span className="text-[11px] text-warm-dim">Bloom’s Taxonomy</span>
              </div>

              <Textarea
                required
                rows={3}
                placeholder="State the primary conceptual or empirical outcome students should be able to explain, construct, or demonstrate by the conclusion of this lesson..."
                value={formData.learning_objective}
                onChange={(e) => {
                  setFormData({ ...formData, learning_objective: e.target.value });
                  if (errors.learning_objective) setErrors({ ...errors, learning_objective: undefined });
                }}
                error={errors.learning_objective}
                helperText={`${formData.learning_objective.length}/500 characters. Activities, examples, and assessment questions will be strictly aligned to this outcome.`}
                disabled={isLoading}
              />
            </Card>
          </div>

          {/* Right Blueprint Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4 sticky top-24">
            <Card variant="elevated" padding="md" className="space-y-5 border-white/[0.1]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>PACKAGE BLUEPRINT</span>
                </div>
                <h3 className="text-sm font-semibold text-warm-white">
                  Curriculum Summary
                </h3>
                <p className="text-[11px] text-warm-muted">
                  Live preview of parameters configured for synthesis.
                </p>
              </div>

              {/* Blueprint details */}
              <div className="space-y-2.5 text-xs border-y border-white/[0.08] py-4">
                <div className="flex items-center justify-between">
                  <span className="text-warm-dim">Subject Scope:</span>
                  <span className="font-medium text-warm-ivory">
                    {formData.subject || 'Not specified'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-dim">Topic:</span>
                  <span className="font-medium text-warm-ivory truncate max-w-[180px]" title={formData.topic}>
                    {formData.topic || 'Pending input'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-dim">Grade Level:</span>
                  <span className="font-medium text-warm-ivory">
                    {formData.class_level}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-dim">Allocated Duration:</span>
                  <span className="font-medium text-accent">
                    {formData.duration_minutes} Minutes
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-dim">Pedagogy Style:</span>
                  <span className="font-medium text-warm-ivory">
                    {formData.teaching_style.split(' ')[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-dim">Difficulty:</span>
                  <span className="font-medium text-warm-ivory">
                    {formData.difficulty_level}
                  </span>
                </div>
              </div>

              {/* Sections list summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-warm-dim uppercase font-mono">
                  <span>8 Synthesized Outputs</span>
                  <span>100% Budgeted</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-warm-muted">
                  <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.04]">01 Hook & Intro</div>
                  <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.04]">02 Objectives</div>
                  <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.04]">03 Concept Theory</div>
                  <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.04]">04 Worked Models</div>
                  <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.04]">05 Active Lab</div>
                  <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.04]">06 Inquiry Questions</div>
                  <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.04]">07 Formative Checks</div>
                  <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.04]">08 Exit Synthesis</div>
                </div>
              </div>

              {/* Primary Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full shadow-glow"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  disabled={isLoading}
                >
                  {isLoading ? 'Synthesizing Package...' : 'Generate Master Package'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </section>
  );
};
