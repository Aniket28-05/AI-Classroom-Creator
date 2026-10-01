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
            className="block text-xs font-semibold tracking-wide uppercase text-[#35373C]"
          >
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#141517] placeholder:text-[#9DA0A5]',
            'transition-all duration-150 resize-y',
            'focus:outline-none focus:ring-1 focus:ring-[#212226] focus:border-[#212226]',
            'disabled:bg-[#F7F7F8] disabled:text-[#9DA0A5] disabled:cursor-not-allowed',
            error ? 'border-red-400 focus:ring-red-400' : 'border-[#DFE0E2] hover:border-[#CACBCE]',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#6E727A]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
