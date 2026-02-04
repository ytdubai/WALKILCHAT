import { StatusIndicator } from '../ui/StatusIndicator';

interface TransactionItemProps {
  type: 'sent' | 'received';
  name: string;
  amount: number;
  item: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
}

export function TransactionItem({
  type,
  name,
  amount,
  item,
  time,
  status,
}: TransactionItemProps) {
  return (
    <div className="glass-card p-4 hover-float">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              type === 'received'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {type === 'received' ? '↓' : '↑'}
          </div>
          <div>
            <p className="text-white font-medium">{name}</p>
            <p className="text-gray-400 text-sm">{item}</p>
          </div>
        </div>
        <div className="text-right">
          <p
            className={`text-lg font-bold ${
              type === 'received' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {type === 'received' ? '+' : '-'}₦{amount.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-400 text-xs">{time}</span>
            <StatusIndicator status={status} />
          </div>
        </div>
      </div>
    </div>
  );
}