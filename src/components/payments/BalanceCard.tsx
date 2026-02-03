import { Card } from '../../lib/components/Card';
import { Button } from '../../lib/components/Button';

interface BalanceCardProps {
  balance: number;
  currency: string;
  onWithdraw: () => void;
  onAddMoney: () => void;
}

export function BalanceCard({
  balance,
  currency,
  onWithdraw,
  onAddMoney,
}: BalanceCardProps) {
  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-gray-800">
      <div className="p-6">
        <div className="text-gray-400 mb-1">Available Balance</div>
        <div className="text-3xl font-bold text-white mb-6">
          {currency} {balance.toLocaleString()}
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onWithdraw} fullWidth>
            Withdraw
          </Button>
          <Button onClick={onAddMoney} fullWidth>
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
}