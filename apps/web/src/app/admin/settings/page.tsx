'use client';

import { AdminSettingsLayout, AdminSettingsCard } from '@/components/admin';
import { Database, Users, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  const databaseSettings = [
    {
      label: 'Status',
      value: 'Connected',
      type: 'badge' as const,
      badgeVariant: 'default' as const,
    },
    { label: 'Type', value: 'PostgreSQL' },
    { label: 'Version', value: '15.0' },
  ];

  const userSettings = [
    {
      label: 'Registration',
      value: 'Enabled',
      type: 'badge' as const,
      badgeVariant: 'default' as const,
    },
    {
      label: 'Email Verification',
      value: 'Required',
      type: 'badge' as const,
      badgeVariant: 'default' as const,
    },
    { label: 'Max Users', value: 'Unlimited' },
  ];

  const securitySettings = [
    { label: '2FA', value: 'Optional', type: 'badge' as const, badgeVariant: 'secondary' as const },
    { label: 'Session Timeout', value: '24 hours' },
    {
      label: 'Rate Limiting',
      value: 'Enabled',
      type: 'badge' as const,
      badgeVariant: 'default' as const,
    },
  ];

  const notificationSettings = [
    {
      label: 'Email Notifications',
      value: 'Enabled',
      type: 'badge' as const,
      badgeVariant: 'default' as const,
    },
    {
      label: 'Push Notifications',
      value: 'Disabled',
      type: 'badge' as const,
      badgeVariant: 'secondary' as const,
    },
    {
      label: 'Admin Alerts',
      value: 'Enabled',
      type: 'badge' as const,
      badgeVariant: 'default' as const,
    },
  ];

  const systemActions = [
    { label: 'Clear Cache', onClick: () => console.log('Clear Cache') },
    { label: 'Backup Database', onClick: () => console.log('Backup Database') },
    { label: 'Export Data', onClick: () => console.log('Export Data') },
    {
      label: 'Reset System',
      onClick: () => console.log('Reset System'),
      variant: 'destructive' as const,
      className: 'border-red-300 text-red-600 hover:bg-red-50',
    },
  ];

  return (
    <AdminSettingsLayout systemActions={systemActions}>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <AdminSettingsCard
          title='Database'
          description='Database configuration and status'
          icon={Database}
          iconColor='text-blue-600'
          settings={databaseSettings}
        />

        <AdminSettingsCard
          title='Users'
          description='User management settings'
          icon={Users}
          iconColor='text-green-600'
          settings={userSettings}
        />

        <AdminSettingsCard
          title='Security'
          description='Security and authentication settings'
          icon={Shield}
          iconColor='text-purple-600'
          settings={securitySettings}
        />

        <AdminSettingsCard
          title='Notifications'
          description='Notification preferences'
          icon={Bell}
          iconColor='text-orange-600'
          settings={notificationSettings}
        />
      </div>
    </AdminSettingsLayout>
  );
}
