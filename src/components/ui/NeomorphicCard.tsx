import { ReactNode } from 'react';
import clsx from 'clsx';

interface NeomorphicCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function NeomorphicCard({
  children,
  className,
  hover = true,
  glow = false
}: NeomorphicCardProps) {
  return (
    <div
      className={clsx(
        'relative backdrop-blur-xl rounded-2xl transition-all duration-300',
        'bg-gradient-to-br from-gray-900/90 to-gray-800/90',
        'border border-white/5',
        hover && 'hover:border-white/10 hover:translate-y-[-2px]',
        glow && 'shadow-lg shadow-purple-500/20',
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="relative">{children}</div>

      {/* Bottom highlight */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}