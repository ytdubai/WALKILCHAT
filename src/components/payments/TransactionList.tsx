import { Card } from '../ui/Card';
import { StatusIndicator } from '../ui/StatusIndicator';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  currency: string;
  description: string;
  date: string;
  status: 'success' | 'pending' | 'error';
  reference: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <Card key={tx.id} hover>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  tx.type === 'credit' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {tx.type === 'credit' ? '↓' : '↑'}
                </div>
                <div>
                  <p className="text-white font-medium">{tx.description}</p>
                  <p className="text-sm text-gray-400">Ref: {tx.reference}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${
                  tx.type === 'credit' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {tx.type === 'credit' ? '+' : '-'}{tx.currency} {tx.amount.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{tx.date}</span>
                  <StatusIndicator status={tx.status} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      {transactions.length === 0 && (
        <Card>
          <div className="p-12 text-center">
            <p className="text-gray-400">No transactions yet</p>
          </div>
        </Card>
      )}
    </div>
  );
}