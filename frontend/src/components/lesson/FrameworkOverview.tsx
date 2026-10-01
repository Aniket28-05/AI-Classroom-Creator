import React from 'react';
import { Layers, Lightbulb, Target, BookOpen, PenTool, Users, HelpCircle, CheckSquare, Flag } from 'lucide-react';

export const FrameworkOverview: React.FC = () => {
  const sections = [
    {
      number: '01',
      title: 'Introduction & Hook',
      desc: 'Engages learner curiosity, activates prior knowledge, and connects concepts to real-world phenomena.',
      icon: Lightbulb,
    },
    {
      number: '02',
      title: 'Learning Objectives',
      desc: 'Measurable, Blooms-aligned outcomes specifying what students will be able to construct or explain.',
      icon: Target,
    },
    {
      number: '03',
      title: 'Concept Explanation',
      desc: 'Detailed conceptual models, theoretical frameworks, and core mechanics with clear pedagogy.',
      icon: BookOpen,
    },
    {
      number: '04',
      title: 'Worked Examples',
      desc: 'Graduated difficulty examples demonstrating problem solving, reasoning chains, and applications.',
      icon: PenTool,
    },
    {
      number: '05',
      title: 'Classroom Activity',
      desc: 'Experiential lab or collaborative inquiry exercise with explicit group protocols and materials.',
      icon: Users,
    },
    {
      number: '06',
      title: 'Discussion Questions',
      desc: 'Socratic discussion prompts prompting debate, edge-case analysis, and deep synthesis.',
      icon: HelpCircle,
    },
    {
      number: '07',
      title: 'Assessment & Checks',
      desc: 'Multi-tiered formative questions to test conceptual understanding and detect misconceptions.',
      icon: CheckSquare,
    },
    {
      number: '08',
      title: 'Conclusion & Takeaway',
      desc: 'Concise conceptual synthesis, exit ticket reflections, and bridges to upcoming curriculum topics.',
      icon: Flag,
    },
  ];

  return (
    <section id="framework-section" className="py-12 border-t border-white/[0.08] space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-accent">
            <Layers className="h-3.5 w-3.5" />
            <span>PEDAGOGICAL ARCHITECTURE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-warm-white">
            The 8-Section Master Package Framework
          </h2>
          <p className="text-xs text-warm-muted leading-relaxed">
            Every generated package adheres to a proven instructional progression designed for cognitive scaffolding and active student retention.
          </p>
        </div>
        <div className="text-xs text-warm-dim font-mono">
          <span>Standards Aligned • Modular AI Regeneration</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div
              key={sec.number}
              className="p-4 sm:p-5 rounded-xl glass-card flex flex-col justify-between space-y-3 hover:border-accent/25 transition-all group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold text-accent/80 px-2 py-0.5 rounded-full bg-accent/[0.08] border border-accent/20">
                    SEC {sec.number}
                  </span>
                  <div className="h-6 w-6 rounded-md bg-white/[0.04] text-warm-muted group-hover:text-accent flex items-center justify-center transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h3 className="text-xs font-semibold text-warm-white tracking-tight">
                  {sec.title}
                </h3>
                <p className="text-[11px] text-warm-dim leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
