import React, { useState } from 'react';
import { LessonPackage, SectionKey } from '../../types/lesson';
import { SectionCard } from './SectionCard';
import { AskAssistantSection } from './AskAssistantSection';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import {
  Printer,
  PlusCircle,
  Clock,
  Compass,
  Download,
  Layers,
  FileText,
  ArrowUp,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface LessonViewerProps {
  lessonPackage: LessonPackage;
  onNewLesson: () => void;
  onSaveContent: (key: SectionKey, newContent: string) => void;
  onRegenerateSection: (key: SectionKey, feedback?: string) => Promise<void>;
  regeneratingKey: SectionKey | null;
}

const SECTION_KEYS: { key: SectionKey; number: number; label: string }[] = [
  { key: 'introduction', number: 1, label: 'Introduction & Hook' },
  { key: 'learning_objectives', number: 2, label: 'Learning Objectives' },
  { key: 'concept_explanation', number: 3, label: 'Concept Explanation' },
  { key: 'examples', number: 4, label: 'Worked Examples' },
  { key: 'classroom_activity', number: 5, label: 'Classroom Activity' },
  { key: 'discussion_questions', number: 6, label: 'Discussion Questions' },
  { key: 'assessment_questions', number: 7, label: 'Assessment Questions' },
  { key: 'conclusion', number: 8, label: 'Conclusion & Summary' },
];

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lessonPackage,
  onNewLesson,
  onSaveContent,
  onRegenerateSection,
  regeneratingKey,
}) => {
  const { metadata, sections } = lessonPackage;
  const [activeNavKey, setActiveNavKey] = useState<SectionKey>('introduction');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(lessonPackage, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `${metadata.topic.toLowerCase().replace(/\s+/g, '_')}_package.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadMarkdown = () => {
    let mdContent = `# ${metadata.topic}\n\n`;
    mdContent += `**Subject:** ${metadata.subject}  \n`;
    mdContent += `**Grade Level:** ${metadata.class_level}  \n`;
    mdContent += `**Duration:** ${metadata.duration_minutes} minutes  \n`;
    mdContent += `**Pedagogical Style:** ${metadata.teaching_style}  \n`;
    mdContent += `**Difficulty:** ${metadata.difficulty_level}  \n\n`;
    mdContent += `## Core Learning Objective\n${metadata.learning_objective}\n\n---\n\n`;

    SECTION_KEYS.forEach(({ key, number, label }) => {
      const sec = sections[key];
      mdContent += `### Section 0${number}: ${sec.title || label} (${sec.estimated_minutes} min)\n\n`;
      mdContent += `${sec.content}\n\n---\n\n`;
    });

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${metadata.topic.toLowerCase().replace(/\s+/g, '_')}_lesson_package.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scrollToSection = (key: SectionKey) => {
    setActiveNavKey(key);
    const el = document.getElementById(`section-${key}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 animate-fade-in print:space-y-6">
      {/* Lesson Header Card */}
      <Card
        variant="elevated"
        padding="lg"
        className="border-white/[0.1] relative overflow-hidden"
      >
        {/* Subtle accent blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-3xl">
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">
                {metadata.subject}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-warm-ivory font-medium">
                {metadata.class_level}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-warm-ivory font-medium">
                {metadata.difficulty_level} Difficulty
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-warm-ivory font-medium">
                {metadata.teaching_style}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-warm-white">
              {metadata.topic}
            </h1>

            <p className="text-xs text-warm-muted flex items-center gap-2 font-mono">
              <Clock className="h-3.5 w-3.5 text-accent" />
              <span>Target Duration: {metadata.duration_minutes} Minutes</span>
              <span className="text-white/20">•</span>
              <span>8 Modular Sections Compiled</span>
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 print:hidden self-start lg:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="h-3.5 w-3.5" />}
            >
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadMarkdown}
              leftIcon={<FileText className="h-3.5 w-3.5" />}
            >
              Export MD
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
        <div className="pt-5 flex items-start gap-3.5 text-xs sm:text-sm">
          <div className="h-7 w-7 rounded-lg bg-surface-elevated border border-accent/25 flex items-center justify-center flex-shrink-0 mt-0.5 text-accent shadow-glow">
            <Compass className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-warm-white block">
              Core Learning Objective:
            </span>
            <p className="text-warm-ivory leading-relaxed">
              {metadata.learning_objective}
            </p>
          </div>
        </div>
      </Card>

      {/* Interactive AI Teacher Assistant */}
      <div className="print:hidden">
        <AskAssistantSection lessonContext={metadata} />
      </div>

      {/* Main Workspace: Table of Contents + Section Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sticky Table of Contents Navigation (Desktop) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4 print:hidden">
          <Card variant="default" padding="md" className="space-y-4 border-white/[0.08]">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-warm-muted">
                <Layers className="h-3.5 w-3.5 text-accent" />
                <span>TABLE OF CONTENTS</span>
              </div>
              <span className="text-[11px] font-mono text-warm-dim">
                8 Sections
              </span>
            </div>

            <nav className="space-y-1">
              {SECTION_KEYS.map(({ key, number, label }) => {
                const sec = sections[key];
                const isRegen = regeneratingKey === key;
                const isEdited = sec.is_edited;
                const isActive = activeNavKey === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => scrollToSection(key)}
                    className={cn(
                      'w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between group border',
                      isActive
                        ? 'bg-surface-elevated text-warm-white border-white/[0.1] shadow-subtle'
                        : 'text-warm-muted hover:text-warm-white hover:bg-white/[0.04] border-transparent'
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="font-mono text-[10px] text-accent/80 w-5">
                        0{number}
                      </span>
                      <span className="truncate font-medium">{sec.title || label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                      {isEdited && (
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" title="Custom Edited" />
                      )}
                      {isRegen && (
                        <span className="h-2 w-2 rounded-full border border-accent border-t-transparent animate-spin" />
                      )}
                      <span className="text-[10px] font-mono text-warm-dim">
                        {sec.estimated_minutes}m
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={scrollToTop}
                className="w-full py-1.5 text-center text-[11px] text-warm-dim hover:text-warm-white transition-colors flex items-center justify-center gap-1 font-mono"
              >
                <ArrowUp className="h-3 w-3" />
                <span>Return to Top</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Main Section Content Stream */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between px-1 print:hidden">
            <h2 className="text-sm font-semibold tracking-tight text-warm-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-accent" />
              Instructional Sections
            </h2>
            <span className="text-xs text-warm-dim font-mono">
              In-place editing & independent regeneration enabled
            </span>
          </div>

          <div className="space-y-4">
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
    </div>
  );
};
