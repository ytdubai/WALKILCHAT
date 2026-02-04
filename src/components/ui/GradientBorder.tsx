import { ReactNode } from 'react';
import clsx from 'clsx';

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'pink' | 'green';
}

export function GradientBorder({
  children,
  className,
  glowColor = 'purple'
}: GradientBorderProps) {
  const colorMap = {
    purple: 'from-purple-500 via-pink-500 to-purple-500',
    cyan: 'from-cyan-500 via-blue-500 to-cyan-500',
    pink: 'from-pink-500 via-purple-500 to-pink-500',
    green: 'from-green-500 via-emerald-500 to-green-500'
  };

  return (
    <div className={clsx('gradient-border group', className)}>
      <div className="relative bg-gray-900 rounded-xl p-px overflow-hidden">
        {/* Animated gradient border */}
        <div
          className={clsx(
            'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity',
            colorMap[glowColor]
          )}
          style={{ filter: 'blur(8px)' }}
        />
        
        {/* Content */}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}