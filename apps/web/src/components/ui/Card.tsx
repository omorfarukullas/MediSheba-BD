import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'muted' | 'interactive' | 'accent';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantClasses = {
  default: 'bg-panel border-rule text-ink shadow-xs',
  muted: 'bg-ground-muted/70 border-rule/70 text-ink',
  interactive: 'bg-panel border-rule text-ink shadow-xs hover:border-accent/40 hover:shadow-sm transition-all duration-interaction cursor-pointer',
  accent: 'bg-accent/5 border-accent/20 text-ink shadow-xs',
};

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
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
        'rounded-panel border',
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
    <div className={`flex flex-col gap-1.5 pb-4 border-b border-rule/60 ${className}`} {...props}>
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
    <h3 className={`font-display text-lg font-bold text-ink tracking-tight ${className}`} {...props}>
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
    <p className={`text-[13px] text-ink-secondary leading-relaxed ${className}`} {...props}>
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
    <div className={`pt-4 ${className}`} {...props}>
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
    <div className={`flex items-center pt-4 border-t border-rule/60 gap-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

