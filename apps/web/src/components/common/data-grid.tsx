import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Eye, Edit, Trash2, Calendar } from 'lucide-react';
import Link from 'next/link';

interface IDataGridItem {
  id: string;
  title: string;
  description?: string;
  status?: ReactNode;
  metadata?: Array<{
    icon: ReactNode;
    label: string;
    value: string | number;
  }>;
  createdAt: string;
  actions?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: 'default' | 'outline' | 'ghost';
    icon?: ReactNode;
  }>;
}

interface IDataGridProps {
  items: IDataGridItem[];
  emptyState?: ReactNode;
  className?: string;
}

export function DataGrid({ items, emptyState, className = '' }: IDataGridProps) {
  if (items.length === 0) {
    return emptyState || null;
  }

  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {items.map(item => (
        <Card key={item.id} className='transition-shadow hover:shadow-md'>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <CardTitle className='text-lg'>{item.title}</CardTitle>
                {item.description && (
                  <CardDescription className='mt-2'>{item.description}</CardDescription>
                )}
              </div>
              {item.actions && (
                <div className='flex items-center gap-1'>
                  {item.actions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant || 'ghost'}
                      size='sm'
                      onClick={action.onClick}
                      asChild={!!action.href}
                    >
                      {action.href ? (
                        <Link href={action.href}>
                          {action.icon}
                          {action.label}
                        </Link>
                      ) : (
                        <>
                          {action.icon}
                          {action.label}
                        </>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {item.status && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-slate-600'>Status</span>
                  {item.status}
                </div>
              )}

              {item.metadata?.map((meta, index) => (
                <div key={index} className='flex items-center gap-2 text-sm text-slate-600'>
                  {meta.icon}
                  <span>
                    {meta.label}: {meta.value}
                  </span>
                </div>
              ))}

              <div className='flex items-center gap-2 text-sm text-slate-600'>
                <Calendar className='h-4 w-4' />
                <span>Added {new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export const DataGridActions = {
  view: (href: string) => ({
    label: 'View',
    href,
    variant: 'outline' as const,
    icon: <Eye className='mr-2 h-4 w-4' />,
  }),
  edit: (href: string) => ({
    label: 'Edit',
    href,
    variant: 'outline' as const,
    icon: <Edit className='h-4 w-4' />,
  }),
  delete: (onClick: () => void) => ({
    label: 'Delete',
    onClick,
    variant: 'ghost' as const,
    icon: <Trash2 className='h-4 w-4' />,
  }),
};
