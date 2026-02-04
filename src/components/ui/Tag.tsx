interface TagProps {
  children: React.ReactNode;
  color?: 'green' | 'yellow' | 'red' | 'gray';
}

export function Tag({ children, color = 'gray' }: TagProps) {
  const colorClasses = {
    green: 'bg-green-500/20 text-green-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    red: 'bg-red-500/20 text-red-400',
    gray: 'bg-gray-500/20 text-gray-400'
  };

  return (
    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${colorClasses[color]}`}>
      {children}
    </span>
  );
}