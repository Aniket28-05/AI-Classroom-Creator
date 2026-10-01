import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { LessonInputParams, DifficultyLevel } from '../../types/lesson';
import { ArrowRight, BookOpen, Clock, Compass } from 'lucide-react';

interface LessonFormProps {
  onSubmit: (params: LessonInputParams) => void;
  isLoading: boolean;
}

const PRESETS: { label: string; data: LessonInputParams }[] = [
  {
    label: 'Biology: Photosynthesis',
    data: {
      subject: 'Biology',
      topic: 'Photosynthesis & Light Reactions',
      class_level: 'Grade 9',
      duration_minutes: 45,
      learning_objective:
        'Explain how chlorophyll captures light energy to convert carbon dioxide and water into glucose and oxygen inside chloroplasts.',
      teaching_style: 'Inquiry-based',
      difficulty_level: 'Standard',
    },
  },
  {
    label: "Physics: Newton's 3rd Law",
    data: {
      subject: 'Physics',
      topic: "Newton's Third Law of Motion",
      class_level: 'Grade 8',
      duration_minutes: 45,
      learning_objective:
        'Demonstrate that for every action force applied, there is an equal and opposite reaction force acting on interacting objects.',
      teaching_style: 'Experiential / Hands-on',
      difficulty_level: 'Standard',
    },
  },
  {
    label: 'History: French Revolution',
    data: {
      subject: 'World History',
      topic: 'Causes of the French Revolution (1789)',
      class_level: 'Grade 10',
      duration_minutes: 60,
      learning_objective:
        'Analyze how social inequality, economic crisis, and Enlightenment ideas catalyzed the outbreak of the French Revolution in 1789.',
      teaching_style: 'Socratic Dialogue',
      difficulty_level: 'Advanced',
    },
  },
];

export const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, isLoading }) => {
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

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LessonInputParams, string>> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required (e.g. Physics, Biology).';
    } else if (formData.subject.trim().length < 2) {
      newErrors.subject = 'Subject must be at least 2 characters.';
    }

    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required (e.g. Photosynthesis).';
    } else if (formData.topic.trim().length < 2) {
      newErrors.topic = 'Topic must be at least 2 characters.';
    }

    if (!formData.learning_objective.trim()) {
      newErrors.learning_objective = 'Learning objective is required.';
    } else if (formData.learning_objective.trim().length < 15) {
      newErrors.learning_objective = 'Please provide a descriptive objective (at least 15 characters).';
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

  const applyPreset = (preset: LessonInputParams) => {
    setFormData(preset);
    setErrors({});
  };

  return (
    <Card variant="default" padding="lg" className="border-[#DFE0E2] bg-white shadow-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header & Quick Presets */}
        <div className="space-y-3 pb-4 border-b border-[#EFEFEF]">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-[#141517]">
              Lesson Parameters
            </h2>
            <span className="text-[11px] font-medium text-[#6E727A] bg-[#F7F7F8] px-2 py-0.5 rounded border border-[#EFEFEF]">
              7 Required Inputs
            </span>
          </div>
          <p className="text-xs text-[#6E727A]">
            Define the curriculum parameters for the lesson. All sections will be calibrated directly to these inputs.
          </p>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[11px] text-[#9DA0A5] mr-1">Sample Topics:</span>
            {PRESETS.map((preset) => (
              <button
                type="button"
                key={preset.label}
                onClick={() => applyPreset(preset.data)}
                disabled={isLoading}
                className="text-xs font-medium px-2 py-1 rounded bg-[#F7F7F8] text-[#35373C] border border-[#DFE0E2] hover:bg-[#EFEFEF] hover:border-[#CACBCE] transition-colors disabled:opacity-50"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* Row 1: Subject & Topic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Subject"
              required
              placeholder="e.g. Biology, Physics, World History"
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
              label="Topic"
              required
              placeholder="e.g. Photosynthesis, Newton's 3rd Law"
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

          {/* Row 2: Class Level, Duration, Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Class Level"
              required
              value={formData.class_level}
              onChange={(e) => setFormData({ ...formData, class_level: e.target.value })}
              options={[
                { value: 'Grade 5', label: 'Grade 5 (Primary)' },
                { value: 'Grade 6', label: 'Grade 6 (Middle)' },
                { value: 'Grade 7', label: 'Grade 7 (Middle)' },
                { value: 'Grade 8', label: 'Grade 8 (Middle)' },
                { value: 'Grade 9', label: 'Grade 9 (Secondary)' },
                { value: 'Grade 10', label: 'Grade 10 (Secondary)' },
                { value: 'Grade 11', label: 'Grade 11 (Higher Sec.)' },
                { value: 'Grade 12', label: 'Grade 12 (Higher Sec.)' },
                { value: 'Undergraduate', label: 'Undergraduate' },
              ]}
              disabled={isLoading}
            />

            <Select
              label="Lesson Duration"
              required
              value={formData.duration_minutes.toString()}
              onChange={(e) =>
                setFormData({ ...formData, duration_minutes: parseInt(e.target.value, 10) })
              }
              options={[
                { value: '30', label: '30 Minutes' },
                { value: '45', label: '45 Minutes' },
                { value: '60', label: '60 Minutes' },
                { value: '90', label: '90 Minutes' },
              ]}
              disabled={isLoading}
            />

            <Select
              label="Difficulty Level"
              required
              value={formData.difficulty_level}
              onChange={(e) =>
                setFormData({ ...formData, difficulty_level: e.target.value as DifficultyLevel })
              }
              options={[
                { value: 'Foundational', label: 'Foundational / Beginner' },
                { value: 'Standard', label: 'Standard / Grade-Level' },
                { value: 'Advanced', label: 'Advanced / Enriched' },
              ]}
              disabled={isLoading}
            />
          </div>

          {/* Row 3: Teaching Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Preferred Teaching Style"
              required
              value={formData.teaching_style}
              onChange={(e) => setFormData({ ...formData, teaching_style: e.target.value })}
              options={[
                { value: 'Inquiry-based', label: 'Inquiry-based (Question & Discovery)' },
                { value: 'Direct Instruction', label: 'Direct Instruction (Structured Lecture)' },
                { value: 'Socratic Dialogue', label: 'Socratic Dialogue (Debate & Discussion)' },
                { value: 'Experiential / Hands-on', label: 'Experiential / Hands-on (Lab & Activity)' },
              ]}
              disabled={isLoading}
            />

            <div className="space-y-1.5 flex flex-col justify-end">
              <span className="block text-xs font-semibold tracking-wide uppercase text-[#35373C]">
                Duration Allocation
              </span>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F7F7F8] border border-[#DFE0E2] text-xs text-[#4F5259]">
                <Clock className="h-4 w-4 text-[#6E727A]" />
                <span>
                  Total time budgeted: <strong>{formData.duration_minutes} minutes</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Row 4: Learning Objective */}
          <Textarea
            label="Learning Objective"
            required
            rows={3}
            placeholder="What should students understand, explain, or demonstrate by the end of this lesson?"
            value={formData.learning_objective}
            onChange={(e) => {
              setFormData({ ...formData, learning_objective: e.target.value });
              if (errors.learning_objective) setErrors({ ...errors, learning_objective: undefined });
            }}
            error={errors.learning_objective}
            helperText={`${formData.learning_objective.length}/500 characters. Activities & questions will be directly aligned to this objective.`}
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            disabled={isLoading}
          >
            {isLoading ? 'Generating Package via API...' : 'Generate Lesson Package'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
