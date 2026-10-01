import React from 'react';
import { ArrowRight, BookOpen, Sparkles, Clock, Layers, Cpu } from 'lucide-react';
import { Button } from '../common/Button';
import { LessonInputParams } from '../../types/lesson';

interface HeroSectionProps {
  onSelectTopic: (topic: Partial<LessonInputParams>) => void;
  onStartCreating: () => void;
}

const CURRICULUM_STARTERS: { label: string; subject: string; topic: string; objective: string }[] = [
  {
    label: 'Quantum Mechanics',
    subject: 'Physics',
    topic: 'Wave-Particle Duality & Photoelectric Effect',
    objective: 'Demonstrate how experimental observations of the photoelectric effect provide evidence for the quantized particle nature of light photons.',
  },
  {
    label: 'Cellular Biology',
    subject: 'Biology',
    topic: 'Photosynthesis & ATP Synthase Mechanics',
    objective: 'Explain how chlorophyll captures photon energy to drive the chemiosmotic generation of ATP and sugar synthesis inside thylakoid membranes.',
  },
  {
    label: 'Constitutional Law',
    subject: 'Social Studies',
    topic: 'Separation of Powers & Judicial Review',
    objective: 'Analyze how the constitutional doctrine of checks and balances prevents executive overreach using historical landmark case studies.',
  },
  {
    label: 'Macroeconomics',
    subject: 'Economics',
    topic: 'Inflationary Pressures & Central Bank Interest Rates',
    objective: 'Evaluate how monetary policy tools, interest rate adjustments, and reserve ratios impact aggregate demand and price stability.',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTopic, onStartCreating }) => {
  return (
    <section id="hero-section" className="relative pt-6 pb-12 sm:py-16 text-center max-w-5xl mx-auto space-y-8">
      {/* Top subtle category pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-elevated/90 border border-white/[0.08] shadow-card text-xs text-warm-muted animate-fade-in">
        <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
        <span className="font-medium text-warm-ivory">Pedagogical Architecture Engine</span>
        <span className="text-white/20">•</span>
        <span className="text-warm-dim">Grade-Calibrated Blueprint Generator</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-warm-white leading-[1.12]">
          Transform Curriculum Intent Into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-white via-warm-ivory to-accent">
            Master Learning Packages.
          </span>
        </h1>
        <p className="text-sm sm:text-base text-warm-muted max-w-2xl mx-auto leading-relaxed">
          Generate complete 8-section pedagogical blueprints — from engagement hooks and structured concept explanations to interactive activities, inquiry questions, and multi-tier assessments.
        </p>
      </div>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button
          variant="accent"
          size="lg"
          onClick={onStartCreating}
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="w-full sm:w-auto px-7"
        >
          Open Curriculum Studio
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            const el = document.getElementById('framework-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          leftIcon={<Layers className="h-4 w-4 text-warm-muted" />}
          className="w-full sm:w-auto"
        >
          Explore 8-Section Framework
        </Button>
      </div>

      {/* Feature Badges / Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 text-left">
        <div className="p-4 rounded-xl glass-card space-y-1.5">
          <div className="h-7 w-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-accent">
            <Layers className="h-3.5 w-3.5" />
          </div>
          <h2 className="text-xs font-semibold text-warm-white">8 Standard Sections</h2>
          <p className="text-[11px] text-warm-dim leading-normal">
            Rigorous pedagogical progression from hook to evaluation.
          </p>
        </div>

        <div className="p-4 rounded-xl glass-card space-y-1.5">
          <div className="h-7 w-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-accent">
            <Clock className="h-3.5 w-3.5" />
          </div>
          <h2 className="text-xs font-semibold text-warm-white">Time-Budgeted</h2>
          <p className="text-[11px] text-warm-dim leading-normal">
            Automated duration allocation across instructional phases.
          </p>
        </div>

        <div className="p-4 rounded-xl glass-card space-y-1.5">
          <div className="h-7 w-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-accent">
            <BookOpen className="h-3.5 w-3.5" />
          </div>
          <h2 className="text-xs font-semibold text-warm-white">Adaptive Pedagogy</h2>
          <p className="text-[11px] text-warm-dim leading-normal">
            Inquiry, Socratic, Hands-on, or Direct Instruction models.
          </p>
        </div>

        <div className="p-4 rounded-xl glass-card space-y-1.5">
          <div className="h-7 w-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-accent">
            <Cpu className="h-3.5 w-3.5" />
          </div>
          <h2 className="text-xs font-semibold text-warm-white">Granular Control</h2>
          <p className="text-[11px] text-warm-dim leading-normal">
            Edit in-place or independently regenerate any individual section.
          </p>
        </div>
      </div>

      {/* Curriculum Starters / Quick Inspiration */}
      <div className="pt-4 space-y-2.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-warm-dim">
          Explore Curriculum Topics:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CURRICULUM_STARTERS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onSelectTopic(item)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-subtle/80 hover:bg-surface-elevated text-warm-ivory border border-white/[0.06] hover:border-accent/30 transition-all flex items-center gap-1.5 shadow-subtle group active:scale-[0.98]"
            >
              <Sparkles className="h-3 w-3 text-accent/70 group-hover:text-accent transition-colors" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
