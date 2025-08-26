import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';

interface IPageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  description,
  children,
  actions,
  className = '',
}: IPageLayoutProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>{title}</h1>
          {description && <p className='mt-2 text-slate-600'>{description}</p>}
        </div>
        {actions && <div className='flex items-center gap-2'>{actions}</div>}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}

interface IPageCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function PageCard({ title, description, children, icon, className = '' }: IPageCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          {icon}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

interface IEmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: IEmptyStateProps) {
  return (
    <Card>
      <CardContent className='flex h-64 flex-col items-center justify-center text-center'>
        <div className='mb-4 text-slate-400'>{icon}</div>
        <h3 className='mb-2 text-lg font-medium text-slate-900'>{title}</h3>
        <p className='mb-4 text-slate-600'>{description}</p>
        {action && action}
      </CardContent>
    </Card>
  );
}
