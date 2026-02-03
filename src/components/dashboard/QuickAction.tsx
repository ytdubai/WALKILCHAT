import Link from 'next/link';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
}

export function QuickAction({
  icon,
  label,
  href,
  onClick,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-xl p-4 transition-colors min-w-[100px]"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <span className="text-sm text-gray-300 text-center">{label}</span>
    </Link>
  );
}