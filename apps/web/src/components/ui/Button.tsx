import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent hover:bg-accent/90 text-on-accent border-transparent shadow-sm hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-ground-muted hover:bg-rule text-ink border-transparent',
  danger:
    'bg-red-600 hover:bg-red-700 text-white border-transparent shadow-sm',
  ghost:
    'bg-transparent hover:bg-ground-muted text-ink border-transparent',
  outline:
    'bg-panel hover:bg-ground-muted text-ink border-rule hover:border-accent/50 shadow-xs',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[13px] rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-[14px] rounded-panel gap-2',
  lg: 'px-6 py-3.5 text-[15px] rounded-panel gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-semibold border transition duration-interaction select-none',
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin shrink-0 w-4 h-4" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}

