import { LucideIcon, Plus } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className='py-8 text-center'>
      <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100'>
        <Icon className='h-6 w-6 text-slate-400' />
      </div>
      <p className='mb-4 text-sm text-slate-600'>{description}</p>
      <Link href={actionHref}>
        <button className='inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-700'>
          <Plus className='h-4 w-4' />
          {actionText}
        </button>
      </Link>
    </div>
  );
}
