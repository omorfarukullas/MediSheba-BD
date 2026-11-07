import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-6xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#000000]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={[
          'relative w-full rounded-[20px] border border-[#e5e7eb] bg-[#ffffff] text-[#000000]',
          'transform transition-all my-8 p-6 sm:p-8 space-y-4 z-10',
          sizeClasses[size],
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 pb-2 border-b border-[#e5e7eb]">
            <div className="space-y-0.5">
              {title && (
                <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#000000]">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-[13px] text-[#6e6d6c]">{description}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-[#6e6d6c] hover:text-[#000000] hover:bg-[#f1f0ec] transition-colors -mr-1 -mt-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}
