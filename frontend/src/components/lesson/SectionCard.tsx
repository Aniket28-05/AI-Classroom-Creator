import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { SectionItem, SectionKey } from '../../types/lesson';
import {
  Edit3,
  RotateCcw,
  Copy,
  Check,
  Save,
  X,
  Clock,
  Sparkles,
  FileCode,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SectionCardProps {
  sectionKey: SectionKey;
  sectionNumber: number;
  section: SectionItem;
  onSaveContent: (key: SectionKey, newContent: string) => void;
  onRegenerate: (key: SectionKey, feedback?: string) => Promise<void>;
  isRegenerating: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  sectionKey,
  sectionNumber,
  section,
  onSaveContent,
  onRegenerate,
  isRegenerating,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(section.content);
  const [showRegenPrompt, setShowRegenPrompt] = useState(false);
  const [regenFeedback, setRegenFeedback] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync edit buffer if section content updates externally (e.g. regeneration)
  useEffect(() => {
    setEditContent(section.content);
  }, [section.content]);

  const handleSave = () => {
    onSaveContent(sectionKey, editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(section.content);
    setIsEditing(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${section.title}\n\n${section.content}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConfirmRegenerate = async () => {
    setShowRegenPrompt(false);
    await onRegenerate(sectionKey, regenFeedback.trim() || undefined);
    setRegenFeedback('');
  };

  const paddedNum = sectionNumber < 10 ? `0${sectionNumber}` : `${sectionNumber}`;

  return (
    <div id={`section-${sectionKey}`} className="scroll-mt-24">
      <Card
        variant="default"
        padding="none"
        className={cn(
          'transition-all duration-200 overflow-hidden relative border-white/[0.08]',
          isRegenerating && 'border-accent/40 shadow-glow',
          section.is_edited && 'border-white/[0.14]'
        )}
      >
        {/* Card Header */}
        <div className="px-5 py-4 bg-surface-subtle/90 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-semibold text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20">
              {paddedNum}
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-warm-white tracking-tight">
              {section.title}
            </h3>
            {section.is_edited && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded-full">
                Custom Edited
              </span>
            )}
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-1.5 print:hidden">
            <div className="flex items-center gap-1 text-[11px] font-mono text-warm-dim mr-2 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.04]">
              <Clock className="h-3 w-3 text-accent" />
              <span>{section.estimated_minutes} min</span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              title="Copy section to clipboard"
              className="p-1.5 text-warm-muted hover:text-warm-white hover:bg-white/[0.06] rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>

            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                title="Edit section in-place"
                disabled={isRegenerating}
                className="p-1.5 text-warm-muted hover:text-warm-white hover:bg-white/[0.06] rounded-lg transition-colors disabled:opacity-40"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            )}

            {!isEditing && (
              <button
                type="button"
                onClick={() => setShowRegenPrompt(!showRegenPrompt)}
                title="Regenerate this section independently"
                disabled={isRegenerating}
                className={cn(
                  'p-1.5 text-warm-muted hover:text-accent hover:bg-white/[0.06] rounded-lg transition-colors disabled:opacity-40',
                  showRegenPrompt && 'text-accent bg-white/[0.06]'
                )}
              >
                <RotateCcw className={cn('h-4 w-4', isRegenerating && 'animate-spin text-accent')} />
              </button>
            )}
          </div>
        </div>

        {/* Regeneration Prompt Drawer */}
        {showRegenPrompt && (
          <div className="px-5 py-4 bg-surface-elevated/95 border-b border-accent/20 text-xs space-y-3 animate-fade-in print:hidden">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-warm-white flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Instruct AI on Section Regeneration
              </span>
              <button
                onClick={() => setShowRegenPrompt(false)}
                className="text-warm-dim hover:text-warm-white p-1 rounded-md"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-warm-muted text-[11px] leading-relaxed">
              Provide optional guidance to calibrate this specific section (e.g., &quot;Include a hands-on activity using paper & markers&quot;, &quot;Add 2 rigorous multi-step analytical questions&quot;):
            </p>
            <input
              type="text"
              value={regenFeedback}
              onChange={(e) => setRegenFeedback(e.target.value)}
              placeholder="e.g. Adapt for collaborative pairs, simplify vocabulary, or add real-world analogies..."
              className="w-full text-xs px-3.5 py-2 rounded-lg glass-input text-warm-white focus:outline-none focus:border-accent/60"
            />
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRegenPrompt(false)}
              >
                Cancel
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={handleConfirmRegenerate}
                isLoading={isRegenerating}
                leftIcon={<RotateCcw className="h-3 w-3" />}
              >
                Confirm & Regenerate
              </Button>
            </div>
          </div>
        )}

        {/* Card Content or In-place Editor */}
        <div className="p-5 sm:p-6 relative">
          {isRegenerating ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-xs text-warm-muted">
              <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-warm-ivory">Regenerating {section.title} via API...</span>
            </div>
          ) : isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-warm-dim font-mono">
                <span className="flex items-center gap-1.5">
                  <FileCode className="h-3.5 w-3.5 text-accent" />
                  Markdown Editor
                </span>
                <span>{editContent.length} characters</span>
              </div>
              <textarea
                rows={10}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full text-xs sm:text-sm font-mono p-4 rounded-xl glass-input text-warm-white focus:outline-none focus:border-accent/60 leading-relaxed resize-y"
                placeholder="Edit section content..."
              />
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-warm-dim text-[11px]">Supports standard markdown formatting</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSave}
                    leftIcon={<Save className="h-3.5 w-3.5" />}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-warm-ivory leading-relaxed whitespace-pre-line space-y-2 selection:bg-accent/30 font-sans">
              {section.content}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
