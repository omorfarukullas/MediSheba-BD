import React from 'react';

export type BadgeVariant =
  | 'neutral'
  | 'orange'
  | 'indigo'
  | 'lime'
  | 'lavender'
  | 'ice'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'accent';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, { badge: string; dot: string }> = {
  // Neutral: Warm bone or hairline pill with dark text
  neutral: {
    badge: 'bg-[#f1f0ec] text-[#000000] border border-[#e5e7eb]',
    dot: 'bg-[#6e6d6c]',
  },
  // Ember Orange (#ff6808): Signature alert pill
  orange: {
    badge: 'bg-[#ff6808] text-white border-transparent',
    dot: 'bg-white',
  },
  // Indigo Bolt (#4570ff): Primary action pill
  indigo: {
    badge: 'bg-[#4570ff] text-white border-transparent',
    dot: 'bg-white',
  },
  accent: {
    badge: 'bg-[#4570ff] text-white border-transparent',
    dot: 'bg-white',
  },
  // Lime Highlighter (#c6ff94): High-contrast badge for dark cards
  lime: {
    badge: 'bg-[#c6ff94] text-[#000000] border-transparent font-semibold',
    dot: 'bg-[#000000]',
  },
  // Lavender Mist (#ebdcff)
  lavender: {
    badge: 'bg-[#ebdcff] text-[#000000] border-transparent',
    dot: 'bg-[#4570ff]',
  },
  // Ice Blue (#d6e0ff)
  ice: {
    badge: 'bg-[#d6e0ff] text-[#000000] border-transparent',
    dot: 'bg-[#4570ff]',
  },
  info: {
    badge: 'bg-[#d6e0ff] text-[#000000] border-transparent',
    dot: 'bg-[#4570ff]',
  },
  // Semantic mapping:
  success: {
    badge: 'bg-[#c6ff94] text-[#000000] border-transparent',
    dot: 'bg-[#000000]',
  },
  warning: {
    badge: 'bg-[#ebdcff] text-[#000000] border border-[#c293f1]',
    dot: 'bg-[#ff6808]',
  },
  danger: {
    badge: 'bg-[#ff6808] text-white border-transparent',
    dot: 'bg-white',
  },
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium',
  md: 'text-[12px] px-3 py-1 gap-1.5 font-medium',
};

export function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const styles = variantClasses[variant] || variantClasses.neutral;

  return (
    <span
      className={[
        'inline-flex items-center rounded-full leading-none select-none tracking-tight',
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
