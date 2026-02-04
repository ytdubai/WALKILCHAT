import { Card } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  icon: string;
}

export function StatsCard({ title, value, change, trend = 'up', icon }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <span className="text-2xl">{icon}</span>
            <span className="text-sm">{title}</span>
          </div>
          <div className="text-3xl font-bold text-white">{value}</div>
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center text-sm font-medium ${
              trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'} {Math.abs(change)}%
          </div>
        )}
      </div>
    </Card>
  );
}