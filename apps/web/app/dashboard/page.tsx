'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/layout/dashboard-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Badge } from '@repo/ui/components/badge';
import { useAuthContext } from '../../components/auth-provider';
import { ProtectedRoute } from '../../components/auth/protected-route';
import { apiClient, Wish, Wishlist, WishStatus } from '../../lib/api';
import { Gift, List, Heart, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface IDashboardStats {
  totalWishlists: number;
  totalWishes: number;
  completedWishes: number;
  pendingWishes: number;
}

function DashboardContent() {
  const { user } = useAuthContext();
  const [stats, setStats] = useState<IDashboardStats>({
    totalWishlists: 0,
    totalWishes: 0,
    completedWishes: 0,
    pendingWishes: 0,
  });
  const [recentWishlists, setRecentWishlists] = useState<Wishlist[]>([]);
  const [recentWishes, setRecentWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [wishlistsResponse, wishesResponse] = await Promise.all([
          apiClient.getWishlists(),
          apiClient.getWishes(),
        ]);

        if (wishlistsResponse.success && wishlistsResponse.data) {
          const wishlists = wishlistsResponse.data as Wishlist[];
          setRecentWishlists(wishlists.slice(0, 3));
          setStats(prev => ({ ...prev, totalWishlists: wishlists.length }));
        }

        if (wishesResponse.success && wishesResponse.data) {
          const wishes = wishesResponse.data as Wish[];
          const completed = wishes.filter(wish => wish.status === WishStatus.ACHIEVED).length;
          const pending = wishes.filter(wish => wish.status === WishStatus.ACTIVE).length;

          setRecentWishes(wishes.slice(0, 5));
          setStats(prev => ({
            ...prev,
            totalWishes: wishes.length,
            completedWishes: completed,
            pendingWishes: pending,
          }));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className='flex h-64 items-center justify-center'>
          <div className='text-slate-600'>Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Welcome Section */}
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>
            Welcome back, {user?.name || user?.email}!
          </h1>
          <p className='mt-2 text-slate-600'>
            Here&apos;s what&apos;s happening with your wishlists and wishes.
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Wishlists</CardTitle>
              <List className='h-4 w-4 text-slate-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats.totalWishlists}</div>
              <p className='text-xs text-slate-600'>Your wishlists</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Wishes</CardTitle>
              <Gift className='h-4 w-4 text-slate-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stats.totalWishes}</div>
              <p className='text-xs text-slate-600'>All your wishes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Achieved</CardTitle>
              <Heart className='h-4 w-4 text-green-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-green-600'>{stats.completedWishes}</div>
              <p className='text-xs text-slate-600'>Wishes achieved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Active</CardTitle>
              <Gift className='h-4 w-4 text-orange-600' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-orange-600'>{stats.pendingWishes}</div>
              <p className='text-xs text-slate-600'>Still active</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Plus className='h-5 w-5' />
                Quick Actions
              </CardTitle>
              <CardDescription>Create new wishlists and wishes quickly</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Link href='/wishlists/new'>
                <Button className='w-full justify-start' variant='outline'>
                  <List className='mr-2 h-4 w-4' />
                  Create New Wishlist
                </Button>
              </Link>
              <Link href='/wishes/new'>
                <Button className='w-full justify-start' variant='outline'>
                  <Gift className='mr-2 h-4 w-4' />
                  Add New Wish
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest wishlists and wishes</CardDescription>
            </CardHeader>
            <CardContent>
              {recentWishlists.length > 0 ? (
                <div className='space-y-3'>
                  {recentWishlists.map(wishlist => (
                    <div
                      key={wishlist.id}
                      className='flex items-center justify-between rounded-lg bg-slate-50 p-3'
                    >
                      <div>
                        <p className='text-sm font-medium'>{wishlist.name}</p>
                        <p className='text-xs text-slate-600'>Wishlist</p>
                      </div>
                      <Link href={`/wishlists/${wishlist.id}`}>
                        <Button size='sm' variant='ghost'>
                          <ArrowRight className='h-4 w-4' />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-sm text-slate-600'>No wishlists yet. Create your first one!</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Wishes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Wishes</CardTitle>
            <CardDescription>Your latest wishes across all wishlists</CardDescription>
          </CardHeader>
          <CardContent>
            {recentWishes.length > 0 ? (
              <div className='space-y-4'>
                {recentWishes.map(wish => (
                  <div
                    key={wish.id}
                    className='flex items-center justify-between rounded-lg border border-slate-200 p-4'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-3'>
                        <h4 className='font-medium'>{wish.title}</h4>
                        <Badge
                          variant={wish.status === WishStatus.ACHIEVED ? 'default' : 'secondary'}
                        >
                          {wish.status}
                        </Badge>
                      </div>
                      {wish.details?.description && (
                        <p className='mt-1 text-sm text-slate-600'>{wish.details.description}</p>
                      )}
                      {wish.details?.price && (
                        <p className='mt-1 text-sm text-slate-500'>${wish.details.price}</p>
                      )}
                    </div>
                    <Link href={`/wishes/${wish.id}`}>
                      <Button size='sm' variant='ghost'>
                        <ArrowRight className='h-4 w-4' />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm text-slate-600'>No wishes yet. Add your first wish!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
