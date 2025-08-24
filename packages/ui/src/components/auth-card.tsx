import * as React from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
  return (
    <Card className={cn('w-full max-w-md', className)}>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-center text-2xl font-bold'>{title}</CardTitle>
        <CardDescription className='text-center'>{description}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {children}
        {footer && <div className='mt-4 text-center'>{footer}</div>}
      </CardContent>
    </Card>
  );
}

interface AuthLinkButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function AuthLinkButton({ children, onClick, className }: AuthLinkButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'text-sm text-pink-600 underline transition-colors hover:text-pink-700',
        className
      )}
    >
      {children}
    </button>
  );
}
