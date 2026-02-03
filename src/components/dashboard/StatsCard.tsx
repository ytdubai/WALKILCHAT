import { Card } from '../../lib/components/Card';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ icon, label, value, trend }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            {icon}
            <span>{label}</span>
          </div>
          <div className="text-2xl font-bold text-white">{value}</div>
        </div>
        {trend && (
          <div
            className={`flex items-center ${
              trend.isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </Card>
  );
}