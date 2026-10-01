import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AlertProps {
  variant?: 'error' | 'warning' | 'info' | 'success';
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'error',
  title,
  children,
  onDismiss,
  className,
}) => {
  const styles = {
    error: {
      container: 'bg-rose-950/40 border-rose-800/40 text-rose-200',
      icon: <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />,
    },
    warning: {
      container: 'bg-amber-950/40 border-amber-800/40 text-amber-200',
      icon: <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />,
    },
    info: {
      container: 'bg-surface-elevated/90 border-white/[0.1] text-warm-white',
      icon: <Info className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />,
    },
    success: {
      container: 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200',
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />,
    },
  };

  const current = styles[variant];

  return (
    <div
      className={cn(
        'p-4 rounded-xl border backdrop-blur-md text-xs transition-all flex items-start justify-between gap-3 shadow-card',
        current.container,
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {current.icon}
        <div className="space-y-1">
          {title && <p className="font-semibold tracking-tight">{title}</p>}
          <div className="leading-relaxed opacity-90">{children}</div>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-current opacity-60 hover:opacity-100 p-1 rounded-md hover:bg-white/[0.08] transition-all"
          aria-label="Dismiss alert"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
