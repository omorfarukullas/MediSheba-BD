import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  density?: 'comfort' | 'compact';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      density = 'comfort',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const isComfort = density === 'comfort';

    return (
      <div className="w-full space-y-1.5 text-left font-sans">
        {label && (
          <label htmlFor={inputId} className="block text-[13px] font-medium text-[#0f3e17]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className={`absolute ${isComfort ? 'left-3.5' : 'left-3'} flex items-center pointer-events-none text-[#5a6e5e] [&>svg]:w-5 [&>svg]:h-5`}>
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={[
              'w-full bg-[#fffefc] text-[#222222] placeholder:text-[#5a6e5e]/70',
              isComfort ? 'h-12 text-base px-4' : 'h-10 text-sm px-3',
              'rounded-[14px] border border-[#efeeeb] transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[#0f3e17] focus:border-[#0f3e17]',
              'disabled:opacity-50 disabled:bg-[#e1f4df] disabled:cursor-not-allowed',
              leftIcon ? (isComfort ? 'pl-11' : 'pl-9') : '',
              rightIcon ? (isComfort ? 'pr-11' : 'pr-9') : '',
              error ? 'border-danger-text focus:ring-danger-text focus:border-danger-text' : '',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />
          {rightIcon && (
            <div className={`absolute ${isComfort ? 'right-3.5' : 'right-3'} flex items-center text-[#5a6e5e] [&>svg]:w-5 [&>svg]:h-5`}>
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="flex items-center gap-1.5 text-[13px] text-danger-text font-medium mt-1">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </p>
        )}
        {!error && helperText && (
          <p className="text-[12px] text-[#5a6e5e] mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
