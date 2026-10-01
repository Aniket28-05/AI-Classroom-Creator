import React from 'react';
import { LessonPackage, SectionKey } from '../../types/lesson';
import { SectionCard } from './SectionCard';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import {
  Printer,
  PlusCircle,
  Clock,
  Compass,
  Download,
  Layers,
} from 'lucide-react';

interface LessonViewerProps {
  lessonPackage: LessonPackage;
  onNewLesson: () => void;
  onSaveContent: (key: SectionKey, newContent: string) => void;
  onRegenerateSection: (key: SectionKey, feedback?: string) => Promise<void>;
  regeneratingKey: SectionKey | null;
}

const SECTION_KEYS: { key: SectionKey; number: number }[] = [
  { key: 'introduction', number: 1 },
  { key: 'learning_objectives', number: 2 },
  { key: 'concept_explanation', number: 3 },
  { key: 'examples', number: 4 },
  { key: 'classroom_activity', number: 5 },
  { key: 'discussion_questions', number: 6 },
  { key: 'assessment_questions', number: 7 },
  { key: 'conclusion', number: 8 },
];

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lessonPackage,
  onNewLesson,
  onSaveContent,
  onRegenerateSection,
  regeneratingKey,
}) => {
  const { metadata, sections } = lessonPackage;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(lessonPackage, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${metadata.topic.toLowerCase().replace(/\s+/g, '_')}_package.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 print:space-y-4">
      {/* Lesson Header Card */}
      <Card variant="default" padding="lg" className="border-[#DFE0E2] bg-white shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EFEFEF]">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#141517] text-white">
                {metadata.subject}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#EFEFEF] text-[#35373C] font-medium">
                {metadata.class_level}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#EFEFEF] text-[#35373C] font-medium">
                {metadata.difficulty_level} Difficulty
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#EFEFEF] text-[#35373C] font-medium">
                {metadata.teaching_style}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#141517]">
              {metadata.topic}
            </h1>
            <p className="text-xs text-[#6E727A] flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Target Duration: {metadata.duration_minutes} Minutes</span>
              <span className="text-[#CACBCE]">•</span>
              <span>Complete 8-Section Lesson Package</span>
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="h-3.5 w-3.5" />}
            >
              Print / Handout
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadJSON}
              leftIcon={<Download className="h-3.5 w-3.5" />}
            >
              Export JSON
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onNewLesson}
              leftIcon={<PlusCircle className="h-3.5 w-3.5" />}
            >
              New Lesson
            </Button>
          </div>
        </div>

        {/* Learning Objective Callout */}
        <div className="pt-4 flex items-start gap-3 text-xs">
          <div className="h-6 w-6 rounded bg-[#F7F7F8] border border-[#DFE0E2] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#141517]">
            <Compass className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="font-semibold text-[#141517]">Core Learning Objective: </span>
            <span className="text-[#4F5259]">{metadata.learning_objective}</span>
          </div>
        </div>
      </Card>

      {/* Grid of 8 Mandatory Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight text-[#141517] flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#212226]" />
            Instructional Package Sections
          </h2>
          <span className="text-xs text-[#6E727A]">
            Each section can be edited in-place or regenerated independently via API
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {SECTION_KEYS.map(({ key, number }) => (
            <SectionCard
              key={key}
              sectionKey={key}
              sectionNumber={number}
              section={sections[key]}
              onSaveContent={onSaveContent}
              onRegenerate={onRegenerateSection}
              isRegenerating={regeneratingKey === key}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
