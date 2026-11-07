import React, { useState } from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'busy' | 'offline';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-[12px]',
  md: 'w-10 h-10 text-[14px]',
  lg: 'w-12 h-12 text-[16px]',
  xl: 'w-16 h-16 text-[20px]',
};

const statusClasses = {
  online: 'bg-emerald-500',
  busy: 'bg-amber-500',
  offline: 'bg-zinc-400',
};

export function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  status,
  className = '',
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (text: string) => {
    if (!text) return '?';
    const parts = text.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const showImage = src && !imageError;

  return (
    <div
      className={`relative inline-flex shrink-0 select-none ${className}`}
      {...props}
    >
      <div
        className={[
          'rounded-full overflow-hidden flex items-center justify-center font-bold font-display border border-rule/60',
          sizeClasses[size],
          showImage ? 'bg-panel' : 'bg-accent/15 text-accent',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name || alt)}</span>
        )}
      </div>

      {status && (
        <span
          className={[
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-panel',
            size === 'sm' ? 'w-2 h-2' : size === 'xl' ? 'w-4 h-4 ring-[3px]' : 'w-3 h-3',
            statusClasses[status],
          ].join(' ')}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

