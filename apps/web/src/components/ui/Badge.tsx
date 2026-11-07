import React from 'react';

export type BadgeVariant =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'accent'
  | 'info'
  | 'orange'
  | 'indigo'
  | 'lime'
  | 'lavender'
  | 'ice';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<string, { badge: string; dot: string }> = {
  // Neutral: Cream Paper pill with subtle border
  neutral: {
    badge: 'bg-[#fffefc] text-[#0f3e17] border border-[#efeeeb]',
    dot: 'bg-[#0f3e17]',
  },
  // Success: Keylime wash pill with sage border
  success: {
    badge: 'bg-[#e1f4df] text-[#0f3e17] border border-[#b1dbb8]',
    dot: 'bg-[#0f3e17]',
  },
  // Warning: soft honey/amber
  warning: {
    badge: 'bg-[#fffbed] text-[#8c4e04] border border-[#fde68a]',
    dot: 'bg-[#8c4e04]',
  },
  // Danger: clinical alert red
  danger: {
    badge: 'bg-[#fef3f2] text-[#b42318] border border-[#fecdca]',
    dot: 'bg-[#b42318]',
  },
  // Accent: Keylime wash / Forest Ink
  accent: {
    badge: 'bg-[#e1f4df] text-[#0f3e17] border border-[#b1dbb8]',
    dot: 'bg-[#0f3e17]',
  },
  info: {
    badge: 'bg-[#b6ced5]/30 text-[#0f3e17] border border-[#b6ced5]',
    dot: 'bg-[#0f3e17]',
  },
  // Fallbacks
  orange: {
    badge: 'bg-[#fffbed] text-[#8c4e04] border border-[#fde68a]',
    dot: 'bg-[#8c4e04]',
  },
  indigo: {
    badge: 'bg-[#b6ced5]/40 text-[#0f3e17] border border-[#b6ced5]',
    dot: 'bg-[#0f3e17]',
  },
  lime: {
    badge: 'bg-[#e1f4df] text-[#0f3e17] border border-[#b1dbb8]',
    dot: 'bg-[#0f3e17]',
  },
  lavender: {
    badge: 'bg-[#cfe7d3] text-[#0f3e17] border border-[#b1dbb8]',
    dot: 'bg-[#0f3e17]',
  },
  ice: {
    badge: 'bg-[#b6ced5]/30 text-[#0f3e17] border border-[#b6ced5]',
    dot: 'bg-[#0f3e17]',
  },
};

export function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  icon,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const styles = variantStyles[variant] || variantStyles.neutral;

  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-[12px] px-2.5 py-0.5 gap-1.5 font-medium',
  };

  return (
    <span
      className={[
        'inline-flex items-center rounded-full leading-none select-none tracking-normal',
        styles.badge,
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
