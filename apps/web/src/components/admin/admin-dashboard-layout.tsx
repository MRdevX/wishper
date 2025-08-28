import { AdminLayout } from '@repo/ui';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  return (
    <AdminLayout>
      <div className='space-y-6'>{children}</div>
    </AdminLayout>
  );
}
