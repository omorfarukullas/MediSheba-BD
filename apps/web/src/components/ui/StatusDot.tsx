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
    bg: 'bg-emerald-500',
    pingBg: 'bg-emerald-400',
    text: 'text-emerald-700 dark:text-emerald-400',
  },
  busy: {
    bg: 'bg-amber-500',
    pingBg: 'bg-amber-400',
    text: 'text-amber-700 dark:text-amber-400',
  },
  offline: {
    bg: 'bg-zinc-400',
    pingBg: 'bg-zinc-300',
    text: 'text-zinc-500',
  },
  warning: {
    bg: 'bg-amber-500',
    pingBg: 'bg-amber-400',
    text: 'text-amber-600',
  },
  danger: {
    bg: 'bg-red-500',
    pingBg: 'bg-red-400',
    text: 'text-red-600',
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
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${styles.pingBg}`}
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

