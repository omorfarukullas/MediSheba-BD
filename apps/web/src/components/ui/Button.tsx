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
  // Primary Forest Button: Filled CTA for demos, explores, and form submits
  primary:
    'bg-[#0f3e17] hover:bg-[#0c2f10] active:bg-[#071d0b] text-[#fffefc] border-[1.5px] border-transparent font-normal',
  // Secondary (outlined Cream): Another choice / Go back
  secondary:
    'bg-[#fffefc] hover:bg-[#e1f4df] active:bg-[#cfe7d3] text-[#0f3e17] border-[1.5px] border-[#0f3e17] font-normal',
  // Danger (red outlined): Delete / Cancel
  danger:
    'bg-[#fffefc] hover:bg-[#fef3f2] active:bg-[#fecdca] text-[#b42318] border-[1.5px] border-[#b42318] font-normal',
  // Ghost (Compact staff only)
  ghost:
    'bg-transparent hover:bg-[#e1f4df] text-[#222222] hover:text-[#0f3e17] border-[1.5px] border-transparent font-normal',
  // Compatibility aliases
  outline:
    'bg-[#fffefc] hover:bg-[#e1f4df] active:bg-[#cfe7d3] text-[#0f3e17] border-[1.5px] border-[#0f3e17] font-normal',
  bone:
    'bg-[#e1f4df] hover:bg-[#cfe7d3] text-[#0f3e17] border-[1.5px] border-transparent font-normal',
  orange:
    'bg-[#fffefc] hover:bg-[#fffbed] active:bg-[#fde68a] text-[#8c4e04] border-[1.5px] border-[#8c4e04] font-normal',
};

const sizeClasses: Record<ButtonSize, string> = {
  // Comfort (Default): 48px height, 14px radius, 14px 21px padding
  comfort: 'min-h-[48px] min-w-[120px] px-5 py-3 text-[14px] md:text-[15px] rounded-[14px] gap-2',
  default: 'min-h-[48px] min-w-[120px] px-5 py-3 text-[14px] md:text-[15px] rounded-[14px] gap-2',
  md: 'min-h-[48px] min-w-[120px] px-5 py-3 text-[14px] md:text-[15px] rounded-[14px] gap-2',
  lg: 'min-h-[54px] min-w-[130px] px-7 py-3.5 text-[16px] rounded-[14px] gap-2.5',
  // Compact (Staff tables): 40px height, 14px radius
  compact: 'min-h-[40px] min-w-[88px] px-4 py-2 text-[13px] md:text-[14px] rounded-[14px] gap-2',
  // Small (inside table rows): 32px height
  sm: 'min-h-[32px] min-w-0 px-3 py-1 text-[12px] rounded-[10px] gap-1.5',
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
