import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: 'purple' | 'cyan' | 'green' | 'none';
  hover?: boolean;
}

export function Card({
  children,
  className,
  glow = 'none',
  hover = true,
}: CardProps) {
  return (
    <div
      className={clsx(
        'relative group',
        hover && 'transition-all duration-300',
        className
      )}
    >
      {/* Glow effect */}
      {glow !== 'none' && (
        <div
          className={clsx(
            'absolute -inset-0.5 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity',
            glow === 'purple' && 'bg-gradient-to-r from-purple-600 to-pink-600',
            glow === 'cyan' && 'bg-gradient-to-r from-cyan-600 to-blue-600',
            glow === 'green' && 'bg-gradient-to-r from-green-600 to-emerald-600',
          )}
        />
      )}

      {/* Glass card */}
      <div
        className={clsx(
          'relative backdrop-blur-xl bg-gray-900/60 border border-white/10 rounded-xl',
          hover && 'hover:bg-gray-900/80 hover:border-white/20',
        )}
      >
        {children}
      </div>
    </div>
  );
}