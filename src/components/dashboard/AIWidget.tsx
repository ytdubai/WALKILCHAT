import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function AIWidget() {
  const stats = {
    messagesHandled: 12,
    paymentReminders: 5,
    customersHelped: 23,
  };

  return (
    <Card className="p-6 border-2 border-purple-500/30" neon>
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
          <span className="text-white font-medium">{stats.messagesHandled} today</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Payment Reminders</span>
          <span className="text-white font-medium">{stats.paymentReminders} sent</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Customers Helped</span>
          <span className="text-white font-medium">{stats.customersHelped}</span>
        </div>
      </div>

      <div className="h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          style={{ width: '85%' }}
        />
      </div>
      <p className="text-gray-400 text-sm mt-2">AI Performance: 85% satisfaction</p>
    </Card>
  );
}