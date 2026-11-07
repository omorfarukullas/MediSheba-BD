import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-[13px] font-semibold text-ink">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-ink-secondary">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={[
              'w-full border rounded-panel bg-ground text-ink text-[14px]',
              'transition duration-interaction placeholder:text-ink-secondary/50',
              'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15',
              'disabled:opacity-60 disabled:bg-ground-muted disabled:cursor-not-allowed',
              leftIcon ? 'pl-10' : 'pl-3.5',
              rightIcon ? 'pr-10' : 'pr-3.5',
              'py-2.5',
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : 'border-rule',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-ink-secondary">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-[12px] text-red-500 font-medium">{error}</p>}
        {!error && helperText && (
          <p className="text-[12px] text-ink-secondary">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
