import { formatDistanceToNow } from 'date-fns';
import { Avatar } from '../../lib/components/Avatar';
import { Badge } from '../../lib/components/Badge';

interface ActivityItemProps {
  type: 'payment' | 'order' | 'message';
  title: string;
  amount?: string;
  time: Date;
  status?: string;
  userImage?: string;
  userName: string;
}

export function ActivityItem({
  type,
  title,
  amount,
  time,
  status,
  userImage,
  userName,
}: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-700/50 rounded-lg transition-colors">
      <Avatar src={userImage} fallback={userName} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="truncate">
            <span className="text-white">{userName}</span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-gray-400">{title}</span>
          </div>
          {amount && <span className="text-white font-medium">{amount}</span>}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-400">
            {formatDistanceToNow(time, { addSuffix: true })}
          </span>
          {status && (
            <>
              <span className="text-gray-400">•</span>
              <Badge
                variant={
                  status === 'completed'
                    ? 'success'
                    : status === 'pending'
                    ? 'warning'
                    : 'error'
                }
                size="sm"
              >
                {status}
              </Badge>
            </>
          )}
        </div>
      </div>
    </div>
  );
}