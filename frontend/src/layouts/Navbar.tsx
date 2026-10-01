import React from 'react';
import { BookOpen, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EFEFEF] bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#141517] text-white flex items-center justify-center shadow-sm">
            <BookOpen className="h-5 w-5 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-[#141517]">
                AI Classroom Creator
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#EFEFEF] text-[#4F5259]">
                PS-004
              </span>
            </div>
            <p className="text-[11px] text-[#6E727A] hidden sm:block">
              Lesson to Learning Package • Agenticthon 2026
            </p>
          </div>
        </div>

        {/* Status / Team Tag */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#DFE0E2] bg-[#F7F7F8] text-[11px] text-[#4F5259]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#212226]" />
            <span>Team AGT-002</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-[#4F5259]">Foundation Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};
