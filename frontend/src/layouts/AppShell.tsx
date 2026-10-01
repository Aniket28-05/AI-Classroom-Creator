import React from 'react';
import { Navbar } from './Navbar';

interface AppShellProps {
  children: React.ReactNode;
  onNewLesson?: () => void;
  hasActiveLesson?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  onNewLesson,
  hasActiveLesson,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-warm-white selection:bg-accent/25 selection:text-white relative overflow-x-hidden">
      {/* Ambient background lighting and subtle grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-accent/8 via-accent/[0.02] to-transparent blur-[140px]" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-grid-subtle mask-radial-fade opacity-70" />
      </div>

      {/* Main navigation */}
      <Navbar onNewLesson={onNewLesson} hasActiveLesson={hasActiveLesson} />

      {/* Content area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {children}
      </main>

      {/* Product Footer */}
      <footer className="border-t border-white/[0.08] bg-[#090A0C]/90 backdrop-blur-md py-10 relative z-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-warm-muted">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-medium text-warm-ivory">
              AI Classroom Creator — Advanced Pedagogical Architecture Studio
            </p>
            <p className="text-warm-dim text-[11px]">
              Calibrated instructional frameworks, time-budgeted lessons, and multi-tiered assessments.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-warm-dim text-[11px]">
            <span>Bloom&apos;s Cognitive Framework</span>
            <span className="text-white/20">•</span>
            <span>8-Section Packages</span>
            <span className="text-white/20">•</span>
            <span>Adaptive Pedagogy</span>
            <span className="text-white/20">•</span>
            <span>Instant Export</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
