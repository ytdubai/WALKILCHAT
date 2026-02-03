import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export function Avatar({ 
  src, 
  alt = '', 
  size = 'md',
  fallback,
  className,
  ...props 
}: AvatarProps) {
  const sizeClass = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  }[size];

  const getFallbackInitials = () => {
    if (!fallback) return '?';
    return fallback
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div
      className={clsx(
        'relative rounded-full overflow-hidden bg-gray-700 flex items-center justify-center',
        sizeClass,
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <span className="text-gray-300 font-medium">
          {getFallbackInitials()}
        </span>
      )}
    </div>
  );
}