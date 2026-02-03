import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface BottomNavProps {
  items: NavItem[];
}

export function BottomNav({ items }: BottomNavProps) {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-lg border-t border-gray-700">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between py-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex flex-col items-center px-3 py-2 text-sm rounded-lg transition-colors',
                router.pathname === item.href
                  ? 'text-purple-400'
                  : 'text-gray-400 hover:text-gray-300'
              )}
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}