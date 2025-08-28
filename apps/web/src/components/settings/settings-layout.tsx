import { DashboardLayout } from '../layout/dashboard-layout';
import { Settings } from 'lucide-react';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>Settings</h1>
          <p className='mt-2 text-slate-600'>Manage your account settings and preferences.</p>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>{children}</div>
      </div>
    </DashboardLayout>
  );
}
