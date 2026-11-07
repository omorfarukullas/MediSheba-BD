import React from 'react';

export type CardVariant = 'default' | 'subtle' | 'interactive';

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
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const isInteractive = variant === 'interactive';
  const isSubtle = variant === 'subtle' || variant === 'bone';

  return (
    <div
      className={[
        'rounded-xl border border-[#e7e5e4] transition-colors duration-150',
        isSubtle ? 'bg-[#f7f7f5]' : 'bg-[#ffffff]',
        isInteractive ? 'hover:border-[#3b5bdb] hover:bg-[#f4f4f2]/40 cursor-pointer' : '',
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
    <div className={`flex flex-col gap-1 pb-3 border-b border-[#e7e5e4] ${className}`} {...props}>
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
    <h3 className={`text-[18px] font-semibold text-[#111111] tracking-tight leading-snug ${className}`} {...props}>
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
    <p className={`text-[13px] text-[#78716c] leading-relaxed ${className}`} {...props}>
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
    <div className={`flex items-center pt-3 border-t border-[#e7e5e4] gap-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Standard Stat Card (Section 7):
 * Label (12px, text-3) above number (28px, 600) with a one-line caption (date or unit).
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
    <div className={`rounded-xl border border-[#e7e5e4] bg-[#ffffff] p-5 space-y-1.5 ${className}`}>
      <div className="text-[12px] font-medium text-[#78716c]">{label}</div>
      <div className="text-[28px] font-semibold leading-tight text-[#111111]">{value}</div>
      {caption && <div className="text-[12px] text-[#78716c]">{caption}</div>}
    </div>
  );
}
