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
      container: 'bg-red-50/80 border-red-200 text-red-900',
      icon: <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />,
    },
    warning: {
      container: 'bg-amber-50/80 border-amber-200 text-amber-900',
      icon: <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />,
    },
    info: {
      container: 'bg-[#F7F7F8] border-[#DFE0E2] text-[#212226]',
      icon: <Info className="h-4 w-4 text-[#4F5259] flex-shrink-0 mt-0.5" />,
    },
    success: {
      container: 'bg-emerald-50/80 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />,
    },
  };

  const current = styles[variant];

  return (
    <div
      className={cn(
        'p-3.5 rounded-lg border text-xs transition-all flex items-start justify-between gap-3 shadow-sm',
        current.container,
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-2.5">
        {current.icon}
        <div className="space-y-0.5">
          {title && <p className="font-semibold">{title}</p>}
          <div className="leading-relaxed">{children}</div>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-current opacity-60 hover:opacity-100 p-0.5 rounded transition-opacity"
          aria-label="Dismiss alert"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
