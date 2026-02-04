type StatusType = 'success' | 'warning' | 'error' | 'pending' | 'completed' | 'failed';

interface StatusIndicatorProps {
  status: StatusType;
  pulse?: boolean;
}

export function StatusIndicator({ status, pulse = false }: StatusIndicatorProps) {
  const normalizedStatus = (status: StatusType): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'completed':
      case 'success':
        return 'success';
      case 'pending':
      case 'warning':
        return 'warning';
      case 'failed':
      case 'error':
        return 'error';
      default:
        return 'warning';
    }
  };

  const displayText = (status: StatusType): string => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const baseClasses = `status-tag ${normalizedStatus(status)}`;
  const classes = pulse ? `${baseClasses} pulse` : baseClasses;

  return (
    <span className={classes}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {displayText(status)}
    </span>
  );
}