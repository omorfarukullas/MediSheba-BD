import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

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
      <div className="w-full space-y-1.5 text-left font-sans">
        {label && (
          <label htmlFor={inputId} className="block text-[14px] font-medium text-[#111111]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-[#78716c]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={[
              'w-full h-10 bg-[#ffffff] text-[#111111] text-[14px] placeholder:text-[#78716c]',
              'rounded-lg border border-[#e7e5e4] transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[#3b5bdb] focus:border-[#3b5bdb]',
              'disabled:opacity-50 disabled:bg-[#f4f4f2] disabled:cursor-not-allowed',
              leftIcon ? 'pl-9' : 'pl-3',
              rightIcon ? 'pr-9' : 'pr-3',
              error ? 'border-[#b42318] focus:ring-[#b42318] focus:border-[#b42318]' : '',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center text-[#78716c]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="flex items-center gap-1 text-[12px] text-[#b42318] font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}
        {!error && helperText && (
          <p className="text-[12px] text-[#78716c]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
