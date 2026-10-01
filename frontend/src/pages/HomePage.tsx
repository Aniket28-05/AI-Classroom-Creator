import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Textarea } from '../components/common/Textarea';
import { SectionHeader } from '../components/common/SectionHeader';
import { api } from '../services/api';
import { HealthStatus } from '../types/lesson';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Check,
  RotateCcw,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [healthLoading, setHealthLoading] = useState(true);
  const [testInput, setTestInput] = useState('Photosynthesis');
  const [testSelect, setTestSelect] = useState('Grade 9');
  const [testTextarea, setTestTextarea] = useState(
    'Students will understand how light energy converts to chemical energy in plant cells.'
  );
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api
      .checkHealth()
      .then((data) => {
        if (isMounted) {
          setHealth(data);
          setHealthLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHealth({ status: 'unreachable', version: '0.0.0', gemini_configured: false });
          setHealthLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSimulateClick = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 1200);
  };

  return (
    <div className="space-y-10">
      {/* Editorial Hero Section */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#DFE0E2] bg-white text-xs text-[#35373C]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#141517]"></span>
          <span>Foundation Shell Initialized</span>
          <span className="text-[#9DA0A5]">•</span>
          <span className="font-mono text-[11px] text-[#6E727A]">Agenticthon 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#141517]">
          AI Classroom Creator
        </h1>
        <p className="text-base text-[#4F5259] leading-relaxed">
          Transforming lesson objectives into comprehensive, pedagogical classroom learning
          packages. Built strictly according to Problem Statement{' '}
          <strong className="text-[#141517] font-semibold">PS-004</strong> with server-side AI
          isolation and structured JSON schema enforcement.
        </p>
      </section>

      {/* Backend & Environment Status Card */}
      <Card variant="default" padding="md" className="border-[#DFE0E2]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-[#F7F7F8] border border-[#DFE0E2] flex items-center justify-center text-[#141517]">
              {healthLoading ? (
                <div className="h-4 w-4 border-2 border-[#141517] border-t-transparent rounded-full animate-spin" />
              ) : health?.status === 'healthy' ? (
                <CheckCircle2 className="h-5 w-5 text-[#212226]" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-600" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#141517]">
                Backend Health & Environment Status
              </h2>
              <p className="text-xs text-[#6E727A]">
                {healthLoading
                  ? 'Connecting to FastAPI backend at http://localhost:8000...'
                  : health?.status === 'healthy'
                  ? `FastAPI Backend v${health.version} connected successfully.`
                  : 'FastAPI backend is offline or starting up.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                health?.status === 'healthy'
                  ? 'bg-[#EFEFEF] text-[#141517]'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {healthLoading ? 'Checking...' : health?.status === 'healthy' ? 'API Online' : 'Check Server'}
            </span>
          </div>
        </div>
      </Card>

      {/* Foundation Component System Showcase */}
      <section className="space-y-6">
        <SectionHeader
          title="Foundation Design System"
          subtitle="Reusable, accessible, monochromatic components built for educational workflows"
          badge="Components Ready"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs & Controls Card */}
          <Card variant="default" padding="lg" className="space-y-5">
            <div className="border-b border-[#EFEFEF] pb-3">
              <h2 className="text-sm font-semibold text-[#141517]">Form Controls</h2>
              <p className="text-xs text-[#6E727A]">Standardized inputs, selectors, and textareas</p>
            </div>

            <Input
              label="Topic Input"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              helperText="Field input for specific classroom topic"
              placeholder="e.g. Newton's Third Law"
            />

            <Select
              label="Class Level Select"
              value={testSelect}
              onChange={(e) => setTestSelect(e.target.value)}
              options={[
                { value: 'Grade 6', label: 'Grade 6 (Middle School)' },
                { value: 'Grade 9', label: 'Grade 9 (Secondary)' },
                { value: 'Grade 11', label: 'Grade 11 (Higher Secondary)' },
                { value: 'Undergraduate', label: 'Undergraduate' },
              ]}
              helperText="Selected target educational tier"
            />

            <Textarea
              label="Learning Objective"
              rows={3}
              value={testTextarea}
              onChange={(e) => setTestTextarea(e.target.value)}
              helperText="Specific measurable outcome students must demonstrate"
            />
          </Card>

          {/* Action Buttons & Card Variants */}
          <Card variant="default" padding="lg" className="space-y-5">
            <div className="border-b border-[#EFEFEF] pb-3">
              <h2 className="text-sm font-semibold text-[#141517]">Action Variants</h2>
              <p className="text-xs text-[#6E727A]">Button hierarchy and interactive states</p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold tracking-wide uppercase text-[#35373C]">
                Button Hierarchy
              </label>
              <div className="flex flex-wrap gap-2.5">
                <Button
                  variant="primary"
                  onClick={handleSimulateClick}
                  isLoading={buttonLoading}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Primary Action
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline" leftIcon={<RotateCcw className="h-3.5 w-3.5" />}>
                  Regenerate
                </Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold tracking-wide uppercase text-[#35373C]">
                Card Variants
              </label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <Card variant="subtle" padding="sm" className="text-center">
                  <span className="font-medium text-[#141517]">Subtle Surface</span>
                  <p className="text-[11px] text-[#6E727A] mt-0.5">Light gray backdrop</p>
                </Card>
                <Card variant="bordered" padding="sm" className="text-center">
                  <span className="font-medium text-[#141517]">Bordered Surface</span>
                  <p className="text-[11px] text-[#6E727A] mt-0.5">Crisp emphasis</p>
                </Card>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F7F7F8] border border-[#DFE0E2] text-xs text-[#4F5259] flex items-center gap-2.5">
              <Check className="h-4 w-4 text-[#141517] flex-shrink-0" />
              <span>Tailwind & Lucide React icons active with zero runtime errors.</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Structured Sections Blueprint (PS-004 Alignment) */}
      <section className="space-y-4">
        <SectionHeader
          title="Structured Package Blueprint"
          subtitle="The 8 mandatory instructional sections defined in PRD.md"
          badge="8 Sections Planned"
          badgeVariant="subtle"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            { id: 1, title: 'Introduction & Hook', time: '5m' },
            { id: 2, title: 'Learning Objectives', time: '3m' },
            { id: 3, title: 'Concept Explanation', time: '15m' },
            { id: 4, title: 'Examples & Analogies', time: '5m' },
            { id: 5, title: 'Classroom Activity', time: '10m' },
            { id: 6, title: 'Discussion Questions', time: '5m' },
            { id: 7, title: 'Assessment Questions', time: '5m' },
            { id: 8, title: 'Conclusion & Wrap-Up', time: '2m' },
          ].map((sec) => (
            <Card key={sec.id} variant="default" padding="sm" className="space-y-1">
              <div className="flex items-center justify-between text-[#6E727A]">
                <span className="font-mono text-[10px]">SECTION 0{sec.id}</span>
                <span className="text-[10px] font-medium bg-[#EFEFEF] px-1.5 py-0.5 rounded text-[#35373C]">
                  {sec.time}
                </span>
              </div>
              <p className="font-medium text-sm text-[#141517]">{sec.title}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
