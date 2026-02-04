import { QuickAction } from './QuickAction';

export function QuickActions() {
  const actions = [
    {
      icon: '➕',
      label: 'New Sale',
      href: '/orders/new',
    },
    {
      icon: '📤',
      label: 'Send Invoice',
      href: '/invoices/new',
    },
    {
      icon: '📢',
      label: 'Message Customers',
      href: '/messages',
    },
    {
      icon: '➕',
      label: 'Add Product',
      href: '/shop/add',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-white font-medium mb-4">Quick Actions</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {actions.map((action) => (
          <QuickAction
            key={action.href}
            icon={action.icon}
            label={action.label}
            href={action.href}
          />
        ))}
      </div>
    </div>
  );
}