import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  optional?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, optional, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {label}
            {optional && <span className="text-gray-500 ml-1">(optional)</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none',
              'placeholder:text-gray-400',
              {
                'pl-10': leftIcon,
                'pr-10': rightIcon,
                'border border-red-500': error,
              },
              !leftIcon && !rightIcon ? 'px-4' : '',
              'py-2',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);