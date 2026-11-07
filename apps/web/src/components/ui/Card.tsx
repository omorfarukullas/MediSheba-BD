import React from 'react';

export type CardVariant = 'default' | 'subtle' | 'interactive' | 'keylime' | 'sage' | 'mint' | 'slate';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant | string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 sm:p-7',
    lg: 'p-7 sm:p-10',
  };

  const surfaceClasses: Record<string, string> = {
    default: 'bg-[#fffefc] border border-[#efeeeb] text-[#222222]',
    subtle: 'bg-[#e1f4df] border border-[#efeeeb] text-[#0f3e17]',
    keylime: 'bg-[#e1f4df] border border-transparent text-[#0f3e17]',
    sage: 'bg-[#b1dbb8] border border-transparent text-[#0f3e17]',
    mint: 'bg-[#cfe7d3] border border-transparent text-[#0f3e17]',
    slate: 'bg-[#b6ced5] border border-transparent text-[#0f3e17]',
    interactive: 'bg-[#fffefc] border border-[#efeeeb] hover:border-[#b1dbb8] hover:bg-[#e1f4df]/20 cursor-pointer text-[#222222]',
  };

  return (
    <div
      className={[
        'rounded-[14px] transition-colors duration-150',
        surfaceClasses[variant] || surfaceClasses.default,
        paddingClasses[padding] || paddingClasses.md,
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
    <div className={`flex flex-col gap-1 pb-3 border-b border-[#efeeeb] ${className}`} {...props}>
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
    <h3 className={`font-serif text-xl sm:text-2xl font-light text-[#0f3e17] tracking-tight ${className}`} {...props}>
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
    <p className={`text-sm text-[#5a6e5e] leading-relaxed ${className}`} {...props}>
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
    <div className={`flex items-center pt-3 border-t border-[#efeeeb] gap-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Standard Botanical Stat Card (Ease Health Style):
 * Eyebrow label above whisper-serif display number (weight 300) with soft caption.
 */
export function StatCard({
  label,
  value,
  caption,
  className = '',
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  caption?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[14px] border border-[#efeeeb] bg-[#fffefc] p-5 sm:p-6 space-y-1.5 ${className}`}>
      <div className="eyebrow text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f3e17]/80">{label}</div>
      <div className="font-serif text-[32px] font-light leading-none text-[#0f3e17] tracking-tight">{value}</div>
      {caption && <div className="text-[12px] text-[#5a6e5e]">{caption}</div>}
    </div>
  );
}
