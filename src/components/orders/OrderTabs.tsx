interface OrderTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
}

export function OrderTabs({ activeTab, onTabChange, counts }: OrderTabsProps) {
  const tabs = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'completed', label: 'Completed', count: counts.completed },
    { id: 'cancelled', label: 'Cancelled', count: counts.cancelled },
  ];

  return (
    <div className="border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}