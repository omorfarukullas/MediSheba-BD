import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'bone' | 'orange';
export type ButtonSize = 'comfort' | 'compact' | 'sm' | 'md' | 'lg' | 'default';

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
  // Primary (blue filled): "Do this". One per content area.
  primary:
    'bg-accent hover:bg-accent-hover active:bg-accent-pressed text-white border-[1.5px] border-transparent',
  // Secondary (outlined): "Another choice" / "Go back".
  secondary:
    'bg-canvas hover:bg-subtle active:bg-border text-ink border-[1.5px] border-ink',
  // Danger (red outlined): "Delete" / "Cancel".
  danger:
    'bg-canvas hover:bg-danger-bg active:bg-danger-border text-danger-text border-[1.5px] border-danger-text',
  // Ghost (Compact staff only)
  ghost:
    'bg-transparent hover:bg-subtle text-text-2 hover:text-ink border-[1.5px] border-transparent',
  // Compatibility aliases
  outline:
    'bg-canvas hover:bg-subtle active:bg-border text-ink border-[1.5px] border-ink',
  bone:
    'bg-subtle hover:bg-border text-ink border-[1.5px] border-transparent',
  orange:
    'bg-canvas hover:bg-warning-bg active:bg-warning-border text-warning-text border-[1.5px] border-warning-border',
};

const sizeClasses: Record<ButtonSize, string> = {
  // Comfort (Default): 48px height, 16px text (BN 17px), 10px 24px padding, min 120px
  comfort: 'min-h-[48px] min-w-[120px] px-6 py-2.5 text-base font-medium rounded-lg gap-2',
  default: 'min-h-[48px] min-w-[120px] px-6 py-2.5 text-base font-medium rounded-lg gap-2',
  md: 'min-h-[48px] min-w-[120px] px-6 py-2.5 text-base font-medium rounded-lg gap-2',
  lg: 'min-h-[52px] min-w-[130px] px-7 py-3 text-base font-medium rounded-lg gap-2.5',
  // Compact (Staff tables): 40px height, 14px text (BN 15px), 8px 16px padding, min 88px
  compact: 'min-h-[40px] min-w-[88px] px-4 py-2 text-sm font-medium rounded-lg gap-2',
  // Small (inside table rows): 32px height, 4px 12px padding
  sm: 'min-h-[32px] min-w-0 px-3 py-1 text-xs font-medium rounded-lg gap-1.5',
};

export function Button({
  variant = 'primary',
  size = 'comfort',
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
        'box-border inline-flex items-center justify-center font-sans text-center transition-colors duration-150 select-none cursor-pointer',
        'focus-visible:outline-[3px] focus-visible:outline-accent focus-visible:outline-offset-2',
        'disabled:bg-subtle disabled:text-text-2 disabled:border-border disabled:cursor-not-allowed',
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.comfort,
        fullWidth ? 'w-full px-4' : '',
        leftIcon ? 'pl-5' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {isBusy ? (
        <Loader2 className="animate-spin shrink-0 w-5 h-5" />
      ) : (
        leftIcon && <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">{leftIcon}</span>
      )}
      {children && <span className="leading-tight">{children}</span>}
      {!isBusy && rightIcon && <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">{rightIcon}</span>}
    </button>
  );
}
