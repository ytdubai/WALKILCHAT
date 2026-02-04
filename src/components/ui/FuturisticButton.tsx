import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface FuturisticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
  loading?: boolean;
}

export function FuturisticButton({
  children,
  variant = 'primary',
  size = 'md',
  glowing = false,
  loading = false,
  className,
  disabled,
  ...props
}: FuturisticButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'relative group font-medium transition-all duration-300',
        'rounded-xl overflow-hidden',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Base styles
        'bg-gradient-to-r border',
        // Variants
        variant === 'primary' && [
          'from-purple-600 to-pink-600',
          'border-purple-500/30',
          'text-white',
          'hover:from-purple-500 hover:to-pink-500',
        ],
        variant === 'secondary' && [
          'from-gray-800 to-gray-700',
          'border-gray-700',
          'text-gray-300',
          'hover:text-white',
        ],
        variant === 'outline' && [
          'bg-none',
          'border-purple-500/30',
          'text-purple-400',
          'hover:bg-purple-500/10',
        ],
        // Sizes
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2',
        size === 'lg' && 'px-6 py-3 text-lg',
        // Glowing effect
        glowing && 'animate-glow',
        className
      )}
      {...props}
    >
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </span>

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  );
}