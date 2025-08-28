import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

interface NavigationItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavigationItem({
  name,
  href,
  icon: Icon,
  isActive,
  onClick,
  className,
}: NavigationItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        className
      )}
      onClick={onClick}
    >
      <Icon
        className={cn(
          'mr-3 h-5 w-5',
          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-500'
        )}
      />
      {name}
    </Link>
  );
}
