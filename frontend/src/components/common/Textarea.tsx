import React from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, className, id, rows = 3, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-[11px] font-semibold tracking-wider uppercase text-warm-muted"
          >
            {label}
            {props.required && <span className="text-accent ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'w-full rounded-lg glass-input px-3.5 py-2.5 text-sm text-warm-white placeholder:text-warm-dim/80 leading-relaxed',
            'transition-all duration-150 resize-y',
            'focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/40',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/30' : '',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-rose-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-warm-dim">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
