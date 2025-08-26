'use client';

import { AdminLayout } from '@repo/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Settings } from 'lucide-react';

interface SystemAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'destructive';
  className?: string;
}

interface AdminSettingsLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  systemActions?: SystemAction[];
}

export function AdminSettingsLayout({
  title = 'Settings',
  description = 'Manage your application settings',
  children,
  systemActions,
}: AdminSettingsLayoutProps) {
  return (
    <AdminLayout>
      <div className='space-y-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 lg:text-3xl'>{title}</h1>
          <p className='mt-2 text-gray-600'>{description}</p>
        </div>

        {children}

        {systemActions && systemActions.length > 0 && (
          <Card className='border-gray-200'>
            <CardHeader className='pb-4'>
              <div className='flex items-center space-x-2'>
                <Settings className='h-5 w-5 text-gray-600' />
                <CardTitle className='text-lg'>System Actions</CardTitle>
              </div>
              <CardDescription>Important system operations</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex flex-wrap gap-4'>
                {systemActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'outline'}
                    onClick={action.onClick}
                    className={action.className || 'border-gray-300 hover:bg-gray-50'}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
