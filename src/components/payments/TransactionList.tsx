import { formatDistanceToNow } from 'date-fns';
import { Card } from '../../lib/components/Card';
import { Badge } from '../../lib/components/Badge';

interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  currency: string;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
}

export function TransactionList({ transactions, loading }: TransactionListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse p-4">
            <div className="h-16 bg-gray-800 rounded-lg" />
          </Card>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4">💸</div>
        <h2 className="text-xl font-bold text-white mb-2">No Transactions Yet</h2>
        <p className="text-gray-400">Your transaction history will appear here</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} hover>
          <div className="p-4 flex items-center gap-4">
            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === 'sent'
                  ? 'bg-red-900/30 text-red-400'
                  : 'bg-green-900/30 text-green-400'
              }`}
            >
              {transaction.type === 'sent' ? '↑' : '↓'}
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="text-white font-medium">
                  {transaction.description}
                </div>
                <div className="text-white font-medium">
                  {transaction.type === 'sent' ? '-' : '+'}
                  {transaction.currency} {transaction.amount.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{transaction.paymentMethod}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(transaction.date, { addSuffix: true })}
                  </span>
                </div>
                <Badge
                  variant={
                    transaction.status === 'completed'
                      ? 'success'
                      : transaction.status === 'pending'
                      ? 'warning'
                      : 'error'
                  }
                  size="sm"
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}