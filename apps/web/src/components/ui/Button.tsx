import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'orange' | 'bone' | 'secondary' | 'danger' | 'ghost' | 'outline';
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
  // Primary Pill Button: #4570ff fill, #ffffff text, 9999px radius, zero shadow, hover #345ee6
  primary:
    'bg-[#4570ff] hover:bg-[#345ee6] text-white border-transparent',
  // Outlined Orange Button: Transparent fill, 2px solid #ff6808, #ff6808 text, 9999px radius
  orange:
    'bg-transparent hover:bg-[#ff6808]/10 text-[#ff6808] border-2 border-[#ff6808]',
  // Neutral Bone Pill Button: Filled #f1f0ec, #000000 text, 9999px radius, hover #e5e7eb
  bone:
    'bg-[#f1f0ec] hover:bg-[#e5e7eb] text-[#000000] border-transparent',
  secondary:
    'bg-[#f1f0ec] hover:bg-[#e5e7eb] text-[#000000] border-transparent',
  // Emergency / Urgent alert action: Ember Orange or saturated accent
  danger:
    'bg-[#ff6808] hover:bg-[#e65c00] text-white border-transparent',
  // Ghost: Transparent fill, #555555 text, hover fills with #f1f0ec and #000000 text
  ghost:
    'bg-transparent hover:bg-[#f1f0ec] text-[#555555] hover:text-[#000000] border-transparent',
  // Outline: #ffffff fill, 1px solid #e5e7eb border, #000000 text, hover #f1f0ec
  outline:
    'bg-[#ffffff] hover:bg-[#f1f0ec] text-[#000000] border border-[#e5e7eb]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-[13px] rounded-full gap-1.5 font-medium',
  md: 'px-5 py-2.5 text-[14px] rounded-full gap-2 font-medium',
  lg: 'px-6 py-3.5 text-[16px] rounded-full gap-2.5 font-medium',
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
        'inline-flex items-center justify-center font-sans transition-colors duration-150 select-none cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
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
