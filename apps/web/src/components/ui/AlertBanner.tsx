import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export type AlertBannerVariant = 'danger' | 'warning' | 'success' | 'info';

export interface AlertBannerProps {
  variant?: AlertBannerVariant;
  title?: React.ReactNode;
  children?: React.ReactNode;
  message?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  className?: string;
}

const variantStyles: Record<AlertBannerVariant, {
  bg: string;
  border: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  danger: {
    bg: 'bg-[#fef3f2]',
    border: 'border-[#fecdca]',
    text: 'text-[#b42318]',
    icon: AlertCircle,
  },
  warning: {
    bg: 'bg-[#fffaeb]',
    border: 'border-[#fedf89]',
    text: 'text-[#b54708]',
    icon: AlertTriangle,
  },
  success: {
    bg: 'bg-[#ecfdf3]',
    border: 'border-[#abefc6]',
    text: 'text-[#067647]',
    icon: CheckCircle2,
  },
  info: {
    bg: 'bg-[#f4f4f2]',
    border: 'border-[#e7e5e4]',
    text: 'text-[#111111]',
    icon: Info,
  },
};

export function AlertBanner({
  variant = 'info',
  title,
  children,
  message,
  action,
  onDismiss,
  className = '',
}: AlertBannerProps) {
  const style = variantStyles[variant];
  const Icon = style.icon;
  const content = message || children;

  return (
    <div
      role="alert"
      className={`w-full rounded-xl border ${style.border} ${style.bg} p-3.5 sm:p-4 flex items-start gap-3 text-[14px] ${style.text} ${className}`}
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 space-y-0.5">
        {title && <div className="font-semibold">{title}</div>}
        <div className="leading-relaxed">{content}</div>
      </div>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="underline font-medium hover:opacity-80 shrink-0 ml-2"
        >
          {action.label}
        </button>
      )}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-inherit hover:opacity-75 p-0.5 -mr-1 -mt-0.5 shrink-0"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
