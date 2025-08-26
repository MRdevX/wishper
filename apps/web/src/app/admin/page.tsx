'use client';

import { Users, Gift, List, TrendingUp } from 'lucide-react';
import {
  AdminDashboardLayout,
  AdminQuickActions,
  AdminRecentActivity,
  useAdminStats,
} from '@/components/admin';

export default function AdminDashboard() {
  const { stats, loading } = useAdminStats();

  const statsConfig = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      description: '+0% from last month',
      icon: Users,
      loading,
    },
    {
      title: 'Total Wishes',
      value: stats.totalWishes,
      description: '+0% from last month',
      icon: Gift,
      loading,
    },
    {
      title: 'Total Wishlists',
      value: stats.totalWishlists,
      description: '+0% from last month',
      icon: List,
      loading,
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      description: '+0% from last month',
      icon: TrendingUp,
      loading,
    },
  ];

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
    <AdminDashboardLayout stats={statsConfig}>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <AdminRecentActivity />
        <AdminQuickActions actions={quickActions} />
      </div>
    </AdminDashboardLayout>
  );
}
