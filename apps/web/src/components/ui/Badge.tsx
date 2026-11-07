import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, { badge: string; dot: string }> = {
  success: {
    badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  warning: {
    badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    dot: 'bg-amber-500',
  },
  danger: {
    badge: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
    dot: 'bg-red-500',
  },
  info: {
    badge: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20',
    dot: 'bg-sky-500',
  },
  accent: {
    badge: 'bg-accent/10 text-accent border-accent/25',
    dot: 'bg-accent',
  },
  neutral: {
    badge: 'bg-ground-muted text-ink-secondary border-rule',
    dot: 'bg-ink-secondary',
  },
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium',
  md: 'text-[12px] px-2.5 py-1 gap-1.5 font-semibold',
};

export function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const styles = variantClasses[variant];

  return (
    <span
      className={[
        'inline-flex items-center rounded-full border leading-none select-none tracking-tight',
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
      {children}
    </span>
  );
}
