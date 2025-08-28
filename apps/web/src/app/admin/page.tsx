'use client';

import {
  AdminDashboardLayout,
  AdminQuickActions,
  AdminRecentActivity,
  AdminStatsSection,
  useAdminStats,
} from '@/components/admin';

export default function AdminDashboard() {
  const { stats, loading } = useAdminStats();

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and edit user accounts',
      href: '/admin/users',
    },
    {
      title: 'Manage Wishes',
      description: 'View and edit wish items',
      href: '/admin/wishes',
    },
    {
      title: 'Manage Wishlists',
      description: 'View and edit wishlists',
      href: '/admin/wishlists',
    },
  ];

  return (
    <AdminDashboardLayout>
      <AdminStatsSection stats={stats} loading={loading} />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <AdminRecentActivity />
        <AdminQuickActions actions={quickActions} />
      </div>
    </AdminDashboardLayout>
  );
}
