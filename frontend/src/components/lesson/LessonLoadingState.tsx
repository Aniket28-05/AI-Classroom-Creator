import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { CheckCircle2, Circle } from 'lucide-react';

const STAGES = [
  'Verifying curriculum alignment & grade-level parameters...',
  'Structuring pedagogical progression & learning objectives...',
  'Synthesizing interactive activity, examples & assessments...',
  'Enforcing JSON schema validation & formatting 8 sections...',
];

export const LessonLoadingState: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Progress Card */}
      <Card variant="default" padding="lg" className="border-[#DFE0E2] bg-white shadow-card">
        <div className="flex items-center gap-4 pb-6 border-b border-[#EFEFEF]">
          <div className="h-10 w-10 rounded-xl bg-[#141517] text-white flex items-center justify-center flex-shrink-0">
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#141517]">
              Generating Classroom Learning Package
            </h2>
            <p className="text-xs text-[#6E727A]">
              Connecting to FastAPI backend & preparing structured lesson content...
            </p>
          </div>
        </div>

        {/* Pipeline steps */}
        <div className="pt-6 space-y-3.5">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStage;
            const isCurrent = idx === currentStage;

            return (
              <div
                key={stage}
                className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                  idx > currentStage ? 'opacity-40' : 'opacity-100'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-[#141517] flex-shrink-0" />
                ) : isCurrent ? (
                  <div className="h-4 w-4 rounded-full border-2 border-[#141517] border-t-transparent animate-spin flex-shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-[#CACBCE] flex-shrink-0" />
                )}
                <span
                  className={
                    isCurrent
                      ? 'font-medium text-[#141517]'
                      : isCompleted
                      ? 'text-[#4F5259]'
                      : 'text-[#9DA0A5]'
                  }
                >
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Skeleton placeholders */}
      <div className="space-y-3 opacity-60">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-[#DFE0E2] bg-white space-y-3 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 bg-[#EFEFEF] rounded w-1/4" />
              <div className="h-3 bg-[#EFEFEF] rounded w-12" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-2.5 bg-[#EFEFEF] rounded w-full" />
              <div className="h-2.5 bg-[#EFEFEF] rounded w-5/6" />
              <div className="h-2.5 bg-[#EFEFEF] rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
