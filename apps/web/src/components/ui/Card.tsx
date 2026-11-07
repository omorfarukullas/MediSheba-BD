import React from 'react';

export type CardVariant =
  | 'default'
  | 'bone'
  | 'lavender'
  | 'ice-blue'
  | 'lilac'
  | 'navy'
  | 'sage'
  | 'dark'
  | 'interactive'
  | 'accent';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantClasses: Record<CardVariant, string> = {
  // Standard: #ffffff surface, 20px radius, 1px solid #e5e7eb border, zero shadow
  default: 'bg-[#ffffff] border border-[#e5e7eb] text-[#000000]',
  // Warm Bone: #f1f0ec structural panel, zero shadow
  bone: 'bg-[#f1f0ec] border border-[#e5e7eb] text-[#000000]',
  // Rotating pastel 1: Lavender Mist (#ebdcff)
  lavender: 'bg-[#ebdcff] border border-transparent text-[#000000]',
  // Rotating pastel 2: Ice Blue (#d6e0ff)
  'ice-blue': 'bg-[#d6e0ff] border border-transparent text-[#000000]',
  // Rotating pastel 3: Lilac Bloom (#c293f1)
  lilac: 'bg-[#c293f1] border border-transparent text-[#000000]',
  // Rotating deep 1: Deep Navy (#193f78) - uses #ffffff text
  navy: 'bg-[#193f78] border border-transparent text-[#ffffff]',
  // Rotating deep 2: Forest Sage (#244f47) - uses #ffffff text
  sage: 'bg-[#244f47] border border-transparent text-[#ffffff]',
  // Dark Contrast Band / Comparison Card: #000000 fill, #ffffff text
  dark: 'bg-[#000000] border border-transparent text-[#ffffff]',
  // Interactive card: hover shifts to #f1f0ec or subtle border highlight
  interactive: 'bg-[#ffffff] border border-[#e5e7eb] text-[#000000] hover:border-[#4570ff]/60 hover:bg-[#f1f0ec]/40 transition-colors duration-150 cursor-pointer',
  // Accent tinted card: Ice Blue with indigo border
  accent: 'bg-[#d6e0ff]/50 border border-[#4570ff]/30 text-[#000000]',
};

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
};

export function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'rounded-[20px]',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col gap-1 pb-3 border-b border-[#e5e7eb] ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-[18px] sm:text-[20px] font-medium text-inherit tracking-tight leading-snug ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-[13px] text-[#6e6d6c] leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`pt-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center pt-3 border-t border-[#e5e7eb] gap-3 ${className}`} {...props}>
      {children}
    </div>
  );
}
