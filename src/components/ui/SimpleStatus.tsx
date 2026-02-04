import clsx from 'clsx';

type StatusType = 'completed' | 'pending' | 'failed';

export function SimpleStatus({ status }: { status: StatusType }) {
  return (
    <span
      className={clsx(
        'inline-flex px-2 py-0.5 text-xs font-medium rounded-full',
        {
          'bg-green-500/20 text-green-400': status === 'completed',
          'bg-yellow-500/20 text-yellow-400': status === 'pending',
          'bg-red-500/20 text-red-400': status === 'failed'
        }
      )}
    >
      {status}
    </span>
  );
}