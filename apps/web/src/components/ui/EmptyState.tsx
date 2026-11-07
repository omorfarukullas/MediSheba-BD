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
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-[#e5e7eb] rounded-[20px] bg-[#f1f0ec]/50 ${className}`}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-[12px] bg-[#ebdcff] text-[#000000] flex items-center justify-center mb-4">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-lg font-medium text-[#000000] tracking-tight mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-[14px] text-[#6e6d6c] max-w-sm mb-5 leading-relaxed">
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
