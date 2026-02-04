import clsx from 'clsx';

interface StatusProps {
  type: 'completed' | 'pending' | 'failed';
  className?: string;
}

export function Status({ type, className }: StatusProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-green-500/20 text-green-400': type === 'completed',
          'bg-yellow-500/20 text-yellow-400': type === 'pending',
          'bg-red-500/20 text-red-400': type === 'failed'
        },
        className
      )}
    >
      {type}
    </span>
  );
}