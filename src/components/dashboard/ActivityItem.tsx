import { StatusIndicator } from '../ui/StatusIndicator';

interface ActivityItemProps {
  type: 'message' | 'payment' | 'order';
  title: string;
  subtitle: string;
  time: string;
  status?: 'success' | 'pending' | 'error';
  icon?: React.ReactNode;
}

export function ActivityItem({
  type,
  title,
  subtitle,
  time,
  status,
  icon,
}: ActivityItemProps) {
  const typeColors = {
    message: 'from-blue-500/20 to-cyan-500/20 text-blue-400',
    payment: 'from-green-500/20 to-emerald-500/20 text-green-400',
    order: 'from-purple-500/20 to-pink-500/20 text-purple-400',
  };

  return (
    <div className="glass-card p-4 hover-float">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeColors[type]} flex items-center justify-center`}>
          {icon || (
            <span className="text-xl">
              {type === 'message' ? '💬' : type === 'payment' ? '💰' : '📦'}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-white font-medium truncate">{title}</p>
            {status && <StatusIndicator status={status} />}
          </div>
          <p className="text-gray-400 text-sm truncate">{subtitle}</p>
        </div>
        <div className="text-gray-500 text-xs whitespace-nowrap">{time}</div>
      </div>
    </div>
  );
}