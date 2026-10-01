import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Sparkles, Send, X, Check } from 'lucide-react';
import { api } from '../../services/api';
import { LessonInputParams } from '../../types/lesson';
import { cn } from '../../utils/cn';

interface AskAssistantSectionProps {
  lessonContext?: LessonInputParams;
  title?: string;
  subtitle?: string;
  className?: string;
}

const QUICK_QUESTIONS = [
  'What are common student misconceptions on this topic and how do I address them?',
  'How do I adapt this lesson for students needing extra scaffolding?',
  'Provide 3 real-world analogies to make this concept intuitive.',
  'What are the full solutions and rubrics for the assessment questions?',
];

export const AskAssistantSection: React.FC<AskAssistantSectionProps> = ({
  lessonContext,
  title = 'Ask AI Teacher Assistant',
  subtitle = 'Get immediate pedagogical answers, explanations, rubrics, and teaching strategies powered by Gemini.',
  className,
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAsk = async (textToAsk?: string) => {
    const q = (textToAsk || question).trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await api.askQuestion(q, lessonContext);
      setAnswer(res.answer);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to reach Gemini AI Assistant. Please check if the backend is running.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk();
  };

  const handleCopy = async () => {
    if (!answer) return;
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card variant="default" padding="md" className={cn('space-y-4 border-white/[0.08]', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-surface-elevated border border-accent/30 text-accent flex items-center justify-center shadow-glow">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-semibold text-warm-white tracking-tight">
                {title}
              </h3>
              <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
                Gemini AI Connected
              </span>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-warm-dim hidden sm:block">
          {subtitle}
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative flex items-center">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={
              lessonContext
                ? `Ask anything about ${lessonContext.topic} (e.g. rubrics, misconceptions, analogies)...`
                : 'Ask any teaching question (e.g. "How to introduce gravity to Grade 5?")...'
            }
            className="w-full rounded-xl glass-input px-4 py-2.5 pr-24 text-xs sm:text-sm text-warm-white placeholder:text-warm-dim/80 focus:border-accent/60"
            disabled={isLoading}
          />
          <div className="absolute right-1.5 flex items-center">
            <Button
              type="submit"
              variant="accent"
              size="sm"
              isLoading={isLoading}
              disabled={!question.trim() || isLoading}
              rightIcon={<Send className="h-3 w-3" />}
            >
              Ask
            </Button>
          </div>
        </div>

        {/* Quick Question Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-warm-dim mr-1">Suggested Questions:</span>
          {QUICK_QUESTIONS.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => {
                setQuestion(item);
                handleAsk(item);
              }}
              className="px-2.5 py-1 rounded-lg bg-surface-subtle hover:bg-surface-elevated text-warm-muted hover:text-warm-white border border-white/[0.06] hover:border-accent/30 transition-all text-left"
            >
              {item.length > 45 ? `${item.slice(0, 45)}...` : item}
            </button>
          ))}
        </div>
      </form>

      {/* Live AI Answer Panel */}
      {answer && (
        <div className="p-4 sm:p-5 rounded-xl bg-surface-card/95 border border-accent/35 shadow-glow space-y-3 animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
            <span className="text-xs font-semibold text-accent flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Teacher Assistant Answer
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-mono px-2.5 py-1 rounded-md text-warm-muted hover:text-warm-white hover:bg-white/[0.06] transition-colors flex items-center gap-1"
                title="Copy answer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : null}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={() => setAnswer(null)}
                className="text-warm-dim hover:text-warm-white p-1 rounded-md"
                title="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-warm-ivory leading-relaxed whitespace-pre-line selection:bg-accent/30 font-sans">
            {answer}
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-xs text-rose-300">
          {error}
        </div>
      )}
    </Card>
  );
};
