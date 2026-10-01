import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'neutral' | 'subtle' | 'outline';
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
    neutral: 'bg-[#141517] text-white',
    subtle: 'bg-[#EFEFEF] text-[#35373C]',
    outline: 'border border-[#CACBCE] text-[#4F5259]',
  };

  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#EFEFEF]', className)}>
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-semibold tracking-tight text-[#141517]">{title}</h2>
          {badge && (
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', badgeStyles[badgeVariant])}>
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-[#6E727A]">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};
