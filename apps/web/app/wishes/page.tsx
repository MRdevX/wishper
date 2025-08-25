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
import { ProtectedRoute } from '../../components/auth/protected-route';
import { apiClient } from '../../lib/api-client';
import type { Wish } from '../../types';
import { WishStatus } from '../../types';
import { Gift, Plus, Edit, Trash2, Eye, Calendar, DollarSign, Tag } from 'lucide-react';
import Link from 'next/link';
import { Loading } from '../../components/ui/loading';

function WishesContent() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.getWishes();
      if (response.success && response.data) {
        setWishes(response.data);
      } else {
        setError(response.error || 'Failed to fetch wishes');
      }
    } catch (_err) {
      setError('Failed to fetch wishes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this wish?')) {
      try {
        const response = await apiClient.deleteWish(id);
        if (response.success) {
          setWishes(prev => prev.filter(wish => wish.id !== id));
        } else {
          alert(`Failed to delete wish: ${response.error}`);
        }
      } catch (error) {
        console.error('Error deleting wish:', error);
        alert('Failed to delete wish');
      }
    }
  };

  const getStatusColor = (status: WishStatus) => {
    switch (status) {
      case WishStatus.ACHIEVED:
        return 'bg-green-100 text-green-800';
      case WishStatus.ACTIVE:
        return 'bg-orange-100 text-orange-800';
      case WishStatus.ARCHIVED:
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-slate-900'>Wishes</h1>
            <p className='mt-2 text-slate-600'>Manage your wishes and track their status.</p>
          </div>
          <Button onClick={() => (window.location.href = '/wishes/new')}>
            <Plus className='mr-2 h-4 w-4' />
            New Wish
          </Button>
        </div>

        {/* Wishes Grid */}
        {isLoading ? (
          <div className='flex h-64 items-center justify-center'>
            <Loading size='lg' text='Loading wishes...' />
          </div>
        ) : error ? (
          <Card>
            <CardContent className='flex h-32 items-center justify-center'>
              <div className='text-red-600'>{error}</div>
            </CardContent>
          </Card>
        ) : wishes.length === 0 ? (
          <Card>
            <CardContent className='flex h-64 flex-col items-center justify-center text-center'>
              <Gift className='mb-4 h-12 w-12 text-slate-400' />
              <h3 className='mb-2 text-lg font-medium text-slate-900'>No wishes yet</h3>
              <p className='mb-4 text-slate-600'>
                Add your first wish to start building your wishlist.
              </p>
              <Button onClick={() => (window.location.href = '/wishes/new')}>
                <Plus className='mr-2 h-4 w-4' />
                Add Wish
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {wishes.map(wish => (
              <Card key={wish.id} className='transition-shadow hover:shadow-md'>
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <CardTitle className='text-lg'>{wish.title}</CardTitle>
                      <CardDescription className='mt-2'>
                        {wish.details?.description || 'No description'}
                      </CardDescription>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Link href={`/wishes/${wish.id}/edit`}>
                        <Button variant='ghost' size='sm'>
                          <Edit className='h-4 w-4' />
                        </Button>
                      </Link>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDelete(wish.id)}
                        className='text-red-600 hover:text-red-700'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-slate-600'>Status</span>
                      <Badge className={getStatusColor(wish.status)}>{wish.status}</Badge>
                    </div>

                    {wish.details?.price && (
                      <div className='flex items-center gap-2 text-sm text-slate-600'>
                        <DollarSign className='h-4 w-4' />
                        <span>${wish.details.price}</span>
                      </div>
                    )}

                    {wish.wishlist && (
                      <div className='flex items-center gap-2 text-sm text-slate-600'>
                        <Tag className='h-4 w-4' />
                        <span>{wish.wishlist.name}</span>
                      </div>
                    )}

                    <div className='flex items-center gap-2 text-sm text-slate-600'>
                      <Calendar className='h-4 w-4' />
                      <span>Added {new Date(wish.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className='flex gap-2 pt-2'>
                      <Link href={`/wishes/${wish.id}`} className='flex-1'>
                        <Button variant='outline' size='sm' className='w-full'>
                          <Eye className='mr-2 h-4 w-4' />
                          View
                        </Button>
                      </Link>
                      <Link href={`/wishes/${wish.id}/edit`}>
                        <Button variant='outline' size='sm'>
                          <Edit className='h-4 w-4' />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function WishesPage() {
  return (
    <ProtectedRoute>
      <WishesContent />
    </ProtectedRoute>
  );
}
