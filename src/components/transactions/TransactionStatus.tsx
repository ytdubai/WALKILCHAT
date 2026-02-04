interface TransactionStatusProps {
  status: 'completed' | 'pending' | 'failed';
}

export function TransactionStatus({ status }: TransactionStatusProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 animate-pulse';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      default:
        return '';
    }
  };

  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusStyles()}`}>
      {status}
    </span>
  );
}