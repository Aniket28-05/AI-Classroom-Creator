import React, { useState } from 'react';
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

  // Sync internal edit buffer if section content updates externally (e.g. regeneration)
  React.useEffect(() => {
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
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConfirmRegenerate = async () => {
    setShowRegenPrompt(false);
    await onRegenerate(sectionKey, regenFeedback.trim() || undefined);
    setRegenFeedback('');
  };

  return (
    <Card
      variant="default"
      padding="none"
      className={cn(
        'border-[#DFE0E2] transition-all bg-white overflow-hidden',
        isRegenerating && 'ring-2 ring-[#212226] opacity-90'
      )}
    >
      {/* Card Header */}
      <div className="px-5 py-3.5 bg-[#FBFBFB] border-b border-[#EFEFEF] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] font-semibold text-[#6E727A] px-1.5 py-0.5 rounded bg-[#EFEFEF]">
            0{sectionNumber}
          </span>
          <h3 className="text-sm font-semibold text-[#141517] tracking-tight">
            {section.title}
          </h3>
          {section.is_edited && (
            <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
              Edited
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 text-[11px] text-[#6E727A] mr-2">
            <Clock className="h-3 w-3" />
            <span>{section.estimated_minutes}m</span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            title="Copy section content"
            className="p-1.5 text-[#6E727A] hover:text-[#141517] hover:bg-[#EFEFEF] rounded transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          </button>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              title="Edit section content"
              disabled={isRegenerating}
              className="p-1.5 text-[#6E727A] hover:text-[#141517] hover:bg-[#EFEFEF] rounded transition-colors disabled:opacity-50"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
          )}

          {!isEditing && (
            <button
              type="button"
              onClick={() => setShowRegenPrompt(!showRegenPrompt)}
              title="Regenerate this section independently"
              disabled={isRegenerating}
              className="p-1.5 text-[#6E727A] hover:text-[#141517] hover:bg-[#EFEFEF] rounded transition-colors disabled:opacity-50"
            >
              <RotateCcw className={cn('h-3.5 w-3.5', isRegenerating && 'animate-spin')} />
            </button>
          )}
        </div>
      </div>

      {/* Regeneration Guidance Prompt Accordion */}
      {showRegenPrompt && (
        <div className="px-5 py-3 bg-[#F7F7F8] border-b border-[#DFE0E2] text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#141517] flex items-center gap-1.5">
              <RotateCcw className="h-3.5 w-3.5 text-[#212226]" />
              Regenerate Section
            </span>
            <button
              onClick={() => setShowRegenPrompt(false)}
              className="text-[#6E727A] hover:text-[#141517]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-[#6E727A]">
            Provide optional instructions for regenerating this specific section (e.g., &quot;make it more hands-on&quot;, &quot;simplify vocabulary&quot;):
          </p>
          <input
            type="text"
            value={regenFeedback}
            onChange={(e) => setRegenFeedback(e.target.value)}
            placeholder="e.g. Include everyday household materials, or adjust question depth"
            className="w-full text-xs px-3 py-1.5 rounded border border-[#DFE0E2] bg-white focus:outline-none focus:ring-1 focus:ring-[#212226]"
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
              variant="primary"
              size="sm"
              onClick={handleConfirmRegenerate}
              isLoading={isRegenerating}
            >
              Confirm & Call API
            </Button>
          </div>
        </div>
      )}

      {/* Card Content / Edit Area */}
      <div className="p-5">
        {isRegenerating ? (
          <div className="py-8 flex flex-col items-center justify-center gap-3 text-xs text-[#6E727A]">
            <div className="h-5 w-5 border-2 border-[#141517] border-t-transparent rounded-full animate-spin" />
            <span>Calling backend to regenerate {section.title}...</span>
          </div>
        ) : isEditing ? (
          <div className="space-y-3">
            <textarea
              rows={8}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full text-xs font-mono p-3 rounded-lg border border-[#DFE0E2] bg-white focus:outline-none focus:ring-1 focus:ring-[#212226] leading-relaxed"
              placeholder="Edit section content..."
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9DA0A5]">Markdown supported</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
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
          <div className="prose prose-xs max-w-none text-xs text-[#35373C] leading-relaxed whitespace-pre-line space-y-2">
            {section.content}
          </div>
        )}
      </div>
    </Card>
  );
};
