import { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  hover?: boolean;
  neon?: boolean;
}

export function Card({
  children,
  className,
  gradient = false,
  hover = true,
  neon = false,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        'glass-card',
        gradient && 'gradient-border',
        hover && 'hover-float',
        neon && 'neon-shadow',
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}