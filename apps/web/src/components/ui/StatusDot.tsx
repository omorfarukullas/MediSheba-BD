import React from 'react';

export type StatusDotVariant = 'online' | 'busy' | 'offline' | 'warning' | 'danger';
export type StatusDotSize = 'sm' | 'md' | 'lg';

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: StatusDotVariant;
  size?: StatusDotSize;
  ping?: boolean;
  label?: string;
}

const variantStyles: Record<StatusDotVariant, { bg: string; pingBg: string; text: string }> = {
  online: {
    bg: 'bg-emerald-600',
    pingBg: 'bg-emerald-500',
    text: 'text-ink',
  },
  busy: {
    bg: 'bg-amber-600',
    pingBg: 'bg-amber-500',
    text: 'text-warning-text',
  },
  offline: {
    bg: 'bg-stone-400',
    pingBg: 'bg-stone-300',
    text: 'text-text-3',
  },
  warning: {
    bg: 'bg-amber-600',
    pingBg: 'bg-amber-500',
    text: 'text-warning-text',
  },
  danger: {
    bg: 'bg-rose-600',
    pingBg: 'bg-rose-500',
    text: 'text-danger-text',
  },
};

const sizeClasses: Record<StatusDotSize, string> = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

export function StatusDot({
  variant = 'online',
  size = 'md',
  ping = false,
  label,
  className = '',
  ...props
}: StatusDotProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-2 select-none ${className}`}
      {...props}
    >
      <span className="relative flex shrink-0">
        {ping && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${styles.pingBg}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full ${sizeClasses[size]} ${styles.bg}`}
        />
      </span>
      {label && (
        <span className={`text-[12px] font-medium leading-none ${styles.text}`}>
          {label}
        </span>
      )}
    </span>
  );
}
