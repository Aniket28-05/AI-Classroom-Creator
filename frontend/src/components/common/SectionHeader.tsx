import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'neutral' | 'subtle' | 'accent' | 'outline';
  actions?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  badgeVariant = 'neutral',
  actions,
  className,
}) => {
  const badgeStyles = {
    neutral: 'bg-white/[0.08] text-warm-white border border-white/[0.08]',
    subtle: 'bg-surface-elevated text-warm-ivory border border-white/[0.05]',
    accent: 'bg-accent/15 text-accent border border-accent/30',
    outline: 'border border-white/[0.12] text-warm-muted',
  };

  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/[0.08]', className)}>
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-warm-white">{title}</h2>
          {badge && (
            <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full', badgeStyles[badgeVariant])}>
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-warm-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};
