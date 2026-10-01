import React from 'react';
import { Navbar } from './Navbar';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFB] text-[#141517]">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-[#EFEFEF] bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E727A]">
          <p>© 2026 AI Classroom Creator. Built for Agenticthon 2026 (Problem ID: PS-004).</p>
          <div className="flex items-center gap-4">
            <span>FastAPI Backend</span>
            <span>•</span>
            <span>React + Vite</span>
            <span>•</span>
            <span>Gemini AI Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
