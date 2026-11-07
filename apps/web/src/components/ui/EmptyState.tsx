import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button, ButtonProps } from './Button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
    icon?: React.ReactNode;
  };
  children?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  children,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-rule rounded-panel bg-panel/60 ${className}`}
    >
      {Icon && (
        <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h3 className="font-display text-lg font-bold text-ink tracking-tight mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-[14px] text-ink-secondary max-w-sm mb-5 leading-relaxed">
          {description}
        </p>
      )}
      {action && (
        <Button
          variant={action.variant || 'primary'}
          onClick={action.onClick}
          leftIcon={action.icon}
        >
          {action.label}
        </Button>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

