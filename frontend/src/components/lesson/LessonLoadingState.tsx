import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { CheckCircle2, Circle, Layers } from 'lucide-react';

const STAGES = [
  {
    title: 'Calibrating Curriculum Parameters & Cognitive Framework',
    detail: 'Aligning Blooms taxonomy depth with target grade level and duration.',
  },
  {
    title: 'Structuring Pedagogical Progression & Instructional Cadence',
    detail: 'Distributing allocated minutes across hook, concept model, and synthesis.',
  },
  {
    title: 'Synthesizing Hands-on Activities & Inquiry Assessments',
    detail: 'Generating collaborative laboratory protocols and multi-tier questions.',
  },
  {
    title: 'Enforcing Schema Validation & Compiling 8 Sections',
    detail: 'Finalizing full classroom package structure and metadata.',
  },
];

export const LessonLoadingState: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="space-y-8 max-w-4xl mx-auto py-8 animate-fade-in">
      {/* Central Progress Panel */}
      <Card variant="elevated" padding="lg" className="border-white/[0.1] relative overflow-hidden">
        {/* Subtle accent glow in top right */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-surface-elevated border border-accent/30 text-accent flex items-center justify-center flex-shrink-0 shadow-glow relative">
              <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-accent">
                  SYNTHESIS IN PROGRESS
                </span>
                <span className="text-white/20">•</span>
                <span className="text-xs text-warm-dim">Pedagogical AI Engine</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-warm-white tracking-tight">
                Assembling Master Learning Package
              </h2>
            </div>
          </div>

          <div className="text-xs font-mono text-warm-muted bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/[0.06] self-start sm:self-auto">
            Stage {currentStage + 1} of {STAGES.length}
          </div>
        </div>

        {/* Pipeline steps */}
        <div className="pt-6 space-y-4">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStage;
            const isCurrent = idx === currentStage;

            return (
              <div
                key={stage.title}
                className={`flex items-start gap-3.5 text-xs transition-all duration-300 p-3 rounded-xl ${
                  isCurrent
                    ? 'bg-surface-elevated/90 border border-accent/25 shadow-glow'
                    : isCompleted
                    ? 'bg-white/[0.02] border border-white/[0.04]'
                    : 'opacity-40 border border-transparent'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <div className="h-4 w-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                  ) : (
                    <Circle className="h-4 w-4 text-warm-dim" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <p
                    className={
                      isCurrent
                        ? 'font-semibold text-warm-white'
                        : isCompleted
                        ? 'font-medium text-warm-ivory'
                        : 'text-warm-dim'
                    }
                  >
                    {stage.title}
                  </p>
                  <p className="text-[11px] text-warm-muted leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Shimmering Blueprint Section Placeholders */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-warm-dim font-mono px-1">
          <span className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            COMPILING 8 INSTRUCTIONAL SECTIONS
          </span>
          <span>LIVE PREVIEW</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-5 rounded-xl glass-card space-y-3 animate-pulse border border-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <div className="h-3 bg-white/[0.08] rounded w-1/3" />
                <div className="h-3 bg-white/[0.05] rounded w-12" />
              </div>
              <div className="space-y-2 pt-1">
                <div className="h-2 bg-white/[0.05] rounded w-full" />
                <div className="h-2 bg-white/[0.04] rounded w-4/5" />
                <div className="h-2 bg-white/[0.03] rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
