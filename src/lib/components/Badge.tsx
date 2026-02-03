import { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'purple';
  size?: 'sm' | 'md';
}

export function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  className,
  ...props 
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        {
          'bg-gray-700 text-gray-300': variant === 'default',
          'bg-green-900/50 text-green-400': variant === 'success',
          'bg-yellow-900/50 text-yellow-400': variant === 'warning',
          'bg-red-900/50 text-red-400': variant === 'error',
          'bg-purple-900/50 text-purple-400': variant === 'purple',
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}