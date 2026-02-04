export type StatusType = 'completed' | 'pending' | 'failed';

export function StatusIndicator({ status }: { status: StatusType }) {
  const getClasses = () => {
    const baseClasses = 'inline-flex px-2 py-0.5 text-xs font-medium rounded-full';
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-500/20 text-green-400`;
      case 'pending':
        return `${baseClasses} bg-yellow-500/20 text-yellow-400`;
      case 'failed':
        return `${baseClasses} bg-red-500/20 text-red-400`;
    }
  };

  return (
    <span className={getClasses()}>
      {status}
    </span>
  );
}