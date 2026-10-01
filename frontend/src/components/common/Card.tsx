import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'subtle' | 'elevated' | 'interactive' | 'accent';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  variant = 'default',
  ...props
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variants = {
    default: 'bg-surface-card/80 backdrop-blur-md border border-white/[0.08] shadow-card',
    subtle: 'bg-surface-subtle/70 backdrop-blur-sm border border-white/[0.05]',
    elevated: 'glass-panel',
    interactive: 'glass-card cursor-pointer hover:border-white/[0.16] active:scale-[0.99]',
    accent: 'bg-surface-card/90 backdrop-blur-md border border-accent-border shadow-glow',
  };

  return (
    <div
      className={cn(
        'rounded-xl text-warm-white transition-all duration-200',
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
