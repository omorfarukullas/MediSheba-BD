import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export function Skeleton({
  variant = 'rounded',
  className = '',
  ...props
}: SkeletonProps) {
  const variantClass =
    variant === 'circular'
      ? 'rounded-full'
      : variant === 'rectangular'
      ? 'rounded-none'
      : 'rounded-panel';

  return (
    <div
      className={`animate-pulse bg-ground-muted border border-rule/40 ${variantClass} ${className}`}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-panel border border-rule bg-panel p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-16 w-full" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  );
}
