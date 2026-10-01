import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'subtle' | 'bordered';
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
    default: 'bg-white border border-[#DFE0E2] shadow-card',
    subtle: 'bg-[#F7F7F8] border border-[#EFEFEF]',
    bordered: 'bg-white border-2 border-[#CACBCE]',
  };

  return (
    <div
      className={cn('rounded-xl transition-all duration-150', variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
};
