import * as React from 'react';
import { cn } from '@repo/ui/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return <div className={cn('min-h-screen bg-slate-50', className)}>{children}</div>;
}

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>{title}</h1>
          {description && <p className='mt-2 text-slate-600'>{description}</p>}
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
