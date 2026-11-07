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
  // Neutral: subtle gray pill
  neutral: {
    badge: 'bg-[#f4f4f2] text-[#57534e] border border-[#e7e5e4]',
    dot: 'bg-[#78716c]',
  },
  // Success: confirmed, paid, normal
  success: {
    badge: 'bg-[#ecfdf3] text-[#067647] border border-[#abefc6]',
    dot: 'bg-[#067647]',
  },
  // Warning: pending, due soon, check
  warning: {
    badge: 'bg-[#fffaeb] text-[#b54708] border border-[#fedf89]',
    dot: 'bg-[#b54708]',
  },
  // Danger: allergy, drug conflict, overdue
  danger: {
    badge: 'bg-[#fef3f2] text-[#b42318] border border-[#fecdca]',
    dot: 'bg-[#b42318]',
  },
  // Accent: selected category / department filter
  accent: {
    badge: 'bg-[#eef2ff] text-[#2f4bc0] border border-[#eef2ff]',
    dot: 'bg-[#2f4bc0]',
  },
  info: {
    badge: 'bg-[#eef2ff] text-[#2f4bc0] border border-[#eef2ff]',
    dot: 'bg-[#2f4bc0]',
  },
  // Fallbacks
  orange: {
    badge: 'bg-[#fffaeb] text-[#b54708] border border-[#fedf89]',
    dot: 'bg-[#b54708]',
  },
  indigo: {
    badge: 'bg-[#eef2ff] text-[#2f4bc0] border border-[#eef2ff]',
    dot: 'bg-[#2f4bc0]',
  },
  lime: {
    badge: 'bg-[#ecfdf3] text-[#067647] border border-[#abefc6]',
    dot: 'bg-[#067647]',
  },
  lavender: {
    badge: 'bg-[#f4f4f2] text-[#57534e] border border-[#e7e5e4]',
    dot: 'bg-[#78716c]',
  },
  ice: {
    badge: 'bg-[#eef2ff] text-[#2f4bc0] border border-[#eef2ff]',
    dot: 'bg-[#2f4bc0]',
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
