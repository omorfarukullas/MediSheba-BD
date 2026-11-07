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
      <div className="w-full space-y-1.5 text-left font-sans">
        {label && (
          <label htmlFor={inputId} className="block text-[13px] font-medium text-[#000000]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#6e6d6c]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={[
              'w-full bg-[#ffffff] text-[#000000] text-[14px] placeholder:text-[#6e6d6c]/60',
              'rounded-[12px] border border-[#e5e7eb] transition-colors duration-150',
              'focus:outline-none focus:border-[#4570ff] focus:ring-1 focus:ring-[#4570ff]',
              'disabled:opacity-50 disabled:bg-[#f1f0ec] disabled:cursor-not-allowed',
              leftIcon ? 'pl-10' : 'pl-3.5',
              rightIcon ? 'pr-10' : 'pr-3.5',
              'py-2.5',
              error ? 'border-[#ff6808] focus:border-[#ff6808] focus:ring-[#ff6808]' : '',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[#6e6d6c]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-[12px] text-[#ff6808] font-medium">{error}</p>}
        {!error && helperText && (
          <p className="text-[12px] text-[#6e6d6c]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
