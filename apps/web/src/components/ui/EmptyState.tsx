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
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-[#e7e5e4] rounded-xl bg-canvas ${className}`}
    >
      {Icon && (
        <div className="w-10 h-10 rounded-lg bg-[#f4f4f2] text-[#78716c] flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-[#78716c]" />
        </div>
      )}
      <h3 className="text-base font-semibold text-ink tracking-tight mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-text-3 max-w-sm mb-5 leading-relaxed">
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
