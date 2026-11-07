import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'bone' | 'orange';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'compact' | 'default';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  // Primary: --color-accent (#3b5bdb) fill, white text, weight 500. Hover #2f4bc0. No shadow.
  primary:
    'bg-[#3b5bdb] hover:bg-[#2f4bc0] text-white border-transparent',
  // Secondary: White fill, 1px solid #d6d3d1, #111111 text. Hover #f4f4f2.
  secondary:
    'bg-[#ffffff] hover:bg-[#f4f4f2] text-[#111111] border border-[#d6d3d1]',
  // Ghost: Transparent, #57534e text. Hover #f4f4f2 + ink text.
  ghost:
    'bg-transparent hover:bg-[#f4f4f2] text-[#57534e] hover:text-[#111111] border-transparent',
  // Danger: White fill, #b42318 text + border #fecdca.
  danger:
    'bg-[#ffffff] hover:bg-[#fef3f2] text-[#b42318] border border-[#fecdca]',
  // Semantic aliases for compatibility
  outline:
    'bg-[#ffffff] hover:bg-[#f4f4f2] text-[#111111] border border-[#d6d3d1]',
  bone:
    'bg-[#f4f4f2] hover:bg-[#e7e5e4] text-[#111111] border-transparent',
  orange:
    'bg-[#ffffff] hover:bg-[#fffaeb] text-[#b54708] border border-[#fedf89]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[13px] rounded-lg gap-1.5 font-medium',
  compact: 'h-8 px-3 text-[13px] rounded-lg gap-1.5 font-medium',
  md: 'h-10 px-4 text-[14px] rounded-lg gap-2 font-medium',
  default: 'h-10 px-4 text-[14px] rounded-lg gap-2 font-medium',
  lg: 'h-11 px-5 text-[15px] rounded-lg gap-2 font-medium',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isBusy = loading || isLoading;
  const isDisabled = disabled || isBusy;

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-sans transition-colors duration-150 select-none cursor-pointer',
        'disabled:opacity-50 disabled:bg-[#f4f4f2] disabled:text-[#78716c] disabled:border-transparent disabled:cursor-not-allowed',
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {isBusy ? (
        <Loader2 className="animate-spin shrink-0 w-4 h-4" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!isBusy && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
