import { ReactNode } from 'react';
import { Card } from '../../lib/components/Card';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <Card>
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </Card>
  );
}