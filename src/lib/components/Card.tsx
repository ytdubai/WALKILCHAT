import { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ 
  children, 
  hover = false,
  padding = 'md',
  className,
  ...props 
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-gray-800 rounded-xl',
        {
          'hover:bg-gray-700 transition-colors cursor-pointer': hover,
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}