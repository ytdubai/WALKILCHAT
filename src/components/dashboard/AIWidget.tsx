import { Card } from '../../lib/components/Card';
import { Button } from '../../lib/components/Button';

interface AIStats {
  messagesHandled: number;
  paymentReminders: number;
  customersHelped: number;
}

export function AIWidget({ stats }: { stats: AIStats }) {
  return (
    <Card className="p-6 border border-purple-500/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <div>
            <h3 className="text-white font-medium">Wakil AI Assistant</h3>
            <p className="text-gray-400 text-sm">Always working for you</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Messages Handled</span>
          <span className="text-white">{stats.messagesHandled} today</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Payment Reminders</span>
          <span className="text-white">{stats.paymentReminders} sent</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Customers Helped</span>
          <span className="text-white">{stats.customersHelped}</span>
        </div>
      </div>

      <div className="h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-purple-500 rounded-full"
          style={{ width: '85%' }}
        />
      </div>
      <p className="text-gray-400 text-sm mt-2">AI Performance: 85% satisfaction</p>
    </Card>
  );
}