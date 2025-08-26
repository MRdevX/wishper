import { Button } from '@repo/ui/components/button';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ActionButtonProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

export function ActionButton({
  href,
  icon: Icon,
  children,
  variant = 'outline',
  className = 'w-full justify-start',
}: ActionButtonProps) {
  return (
    <Link href={href}>
      <Button className={className} variant={variant}>
        <Icon className='mr-2 h-4 w-4' />
        {children}
      </Button>
    </Link>
  );
}
