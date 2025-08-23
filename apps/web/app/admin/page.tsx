'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { StatsCard } from '@repo/ui';
import { Users, Gift, List, TrendingUp } from 'lucide-react';
import { apiClient } from '@/lib/api';

interface DashboardStats {
  totalUsers: number;
  totalWishes: number;
  totalWishlists: number;
  activeUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalWishes: 0,
    totalWishlists: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [usersResponse, wishesResponse, wishlistsResponse] = await Promise.all([
          apiClient.getUsers(),
          apiClient.getWishes(),
          apiClient.getWishlists(),
        ]);

        const users = usersResponse.success ? (usersResponse.data as any[]) || [] : [];
        const wishes = wishesResponse.success ? (wishesResponse.data as any[]) || [] : [];
        const wishlists = wishlistsResponse.success ? (wishlistsResponse.data as any[]) || [] : [];

        setStats({
          totalUsers: users.length,
          totalWishes: wishes.length,
          totalWishlists: wishlists.length,
          activeUsers: users.length,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCard
          title='Total Users'
          value={loading ? '...' : stats.totalUsers.toString()}
          description='+0% from last month'
          icon={Users}
        />
        <StatsCard
          title='Total Wishes'
          value={loading ? '...' : stats.totalWishes.toString()}
          description='+0% from last month'
          icon={Gift}
        />
        <StatsCard
          title='Total Wishlists'
          value={loading ? '...' : stats.totalWishlists.toString()}
          description='+0% from last month'
          icon={List}
        />
        <StatsCard
          title='Active Users'
          value={loading ? '...' : stats.activeUsers.toString()}
          description='+0% from last month'
          icon={TrendingUp}
        />
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <Card className='border-gray-200'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <div className='h-2 w-2 rounded-full bg-gray-300'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-900'>No recent activity</p>
                  <p className='text-xs text-gray-500'>Get started by creating some data</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='border-gray-200'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <a
                href='/admin/users'
                className='block rounded-lg border border-gray-200 p-3 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50'
              >
                <div className='font-medium text-gray-900'>Manage Users</div>
                <div className='text-sm text-gray-500'>View and edit user accounts</div>
              </a>
              <a
                href='/admin/wishes'
                className='block rounded-lg border border-gray-200 p-3 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50'
              >
                <div className='font-medium text-gray-900'>Manage Wishes</div>
                <div className='text-sm text-gray-500'>View and edit wish items</div>
              </a>
              <a
                href='/admin/wishlists'
                className='block rounded-lg border border-gray-200 p-3 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50'
              >
                <div className='font-medium text-gray-900'>Manage Wishlists</div>
                <div className='text-sm text-gray-500'>View and edit wishlists</div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
