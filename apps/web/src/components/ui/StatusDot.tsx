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
    bg: 'bg-[#4570ff]',
    pingBg: 'bg-[#4570ff]',
    text: 'text-[#000000]',
  },
  busy: {
    bg: 'bg-[#ff6808]',
    pingBg: 'bg-[#ff6808]',
    text: 'text-[#ff6808]',
  },
  offline: {
    bg: 'bg-[#d1d5db]',
    pingBg: 'bg-[#d1d5db]',
    text: 'text-[#6e6d6c]',
  },
  warning: {
    bg: 'bg-[#ff6808]',
    pingBg: 'bg-[#ff6808]',
    text: 'text-[#ff6808]',
  },
  danger: {
    bg: 'bg-[#ff6808]',
    pingBg: 'bg-[#ff6808]',
    text: 'text-[#ff6808]',
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
