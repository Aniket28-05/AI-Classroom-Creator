import React from 'react';
import { Sparkles, Layers, Compass, BookOpen } from 'lucide-react';

interface NavbarProps {
  onNewLesson?: () => void;
  hasActiveLesson?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onNewLesson, hasActiveLesson }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090A0C]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-surface-elevated border border-white/[0.1] text-accent flex items-center justify-center shadow-card group cursor-pointer hover:border-accent/40 transition-colors">
            <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm sm:text-base tracking-tight text-warm-white">
                AI Classroom
              </span>
              <span className="text-[10px] uppercase font-mono font-medium tracking-widest px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/25">
                Studio
              </span>
            </div>
            <p className="text-[11px] text-warm-muted hidden sm:block">
              Pedagogical Architecture & Lesson Engineering
            </p>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-1 text-xs text-warm-muted">
          <button
            onClick={() => scrollToSection('hero-section')}
            className="px-3 py-1.5 rounded-lg hover:text-warm-white hover:bg-white/[0.05] transition-colors"
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection('studio-section')}
            className="px-3 py-1.5 rounded-lg hover:text-warm-white hover:bg-white/[0.05] transition-colors flex items-center gap-1.5"
          >
            <Compass className="h-3.5 w-3.5" />
            Lesson Creator
          </button>
          <button
            onClick={() => scrollToSection('framework-section')}
            className="px-3 py-1.5 rounded-lg hover:text-warm-white hover:bg-white/[0.05] transition-colors flex items-center gap-1.5"
          >
            <Layers className="h-3.5 w-3.5" />
            8-Section Framework
          </button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {hasActiveLesson && onNewLesson ? (
            <button
              onClick={onNewLesson}
              className="text-xs font-medium px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-warm-white border border-white/[0.1] transition-all flex items-center gap-1.5 shadow-subtle active:scale-[0.98]"
            >
              <BookOpen className="h-3.5 w-3.5 text-accent" />
              <span>New Lesson</span>
            </button>
          ) : (
            <button
              onClick={() => scrollToSection('studio-section')}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-warm-white text-canvas hover:bg-white transition-all shadow-subtle active:scale-[0.98] hidden sm:inline-flex items-center gap-1.5"
            >
              Create Lesson
            </button>
          )}

          {/* Engine status indicator */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono text-warm-muted hidden lg:inline">
              Engine Ready
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
