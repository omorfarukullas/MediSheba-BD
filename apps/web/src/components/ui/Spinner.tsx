import React from 'react';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  variant?: 'accent' | 'ink' | 'white';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const variantClasses = {
  accent: 'text-accent',
  ink: 'text-ink-secondary',
  white: 'text-white',
};

export function Spinner({
  size = 'md',
  label,
  variant = 'accent',
  className = '',
  ...props
}: SpinnerProps) {
  return (
    <div
      role="status"
      className={`inline-flex items-center justify-center gap-2.5 ${className}`}
      {...props}
    >
      <Loader2
        className={`animate-spin shrink-0 ${sizeClasses[size]} ${variantClasses[variant]}`}
      />
      {label && <span className="text-[13px] text-ink-secondary font-medium">{label}</span>}
      <span className="sr-only">{label || 'Loading...'}</span>
    </div>
  );
}

