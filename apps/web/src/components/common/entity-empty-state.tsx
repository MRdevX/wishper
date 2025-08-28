import { EmptyState } from '../layout/page-layout';
import { Button } from '@repo/ui/components/button';
import { Plus, LucideIcon } from 'lucide-react';

interface IEntityEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
}

export function EntityEmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
}: IEntityEmptyStateProps) {
  return (
    <EmptyState
      icon={<Icon className='h-12 w-12' />}
      title={title}
      description={description}
      action={
        <Button asChild>
          <a href={actionHref}>
            <Plus className='mr-2 h-4 w-4' />
            {actionText}
          </a>
        </Button>
      }
    />
  );
}
