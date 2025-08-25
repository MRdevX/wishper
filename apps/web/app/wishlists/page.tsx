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
import type { Wishlist } from '../../types';
import { List, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Loading } from '../../components/ui/loading';

function WishlistsContent() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.getWishlists();
      if (response.success && response.data) {
        setWishlists(response.data);
      } else {
        setError(response.error || 'Failed to fetch wishlists');
      }
    } catch (_err) {
      setError('Failed to fetch wishlists');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this wishlist?')) {
      try {
        const response = await apiClient.deleteWishlist(id);
        if (response.success) {
          setWishlists(prev => prev.filter(wishlist => wishlist.id !== id));
        } else {
          alert(`Failed to delete wishlist: ${response.error}`);
        }
      } catch (error) {
        console.error('Error deleting wishlist:', error);
        alert('Failed to delete wishlist');
      }
    }
  };

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-slate-900'>Wishlists</h1>
            <p className='mt-2 text-slate-600'>Manage your wishlists and organize your wishes.</p>
          </div>
          <Button onClick={() => (window.location.href = '/wishlists/new')}>
            <Plus className='mr-2 h-4 w-4' />
            New Wishlist
          </Button>
        </div>

        {/* Wishlists Grid */}
        {isLoading ? (
          <div className='flex h-64 items-center justify-center'>
            <Loading size='lg' text='Loading wishlists...' />
          </div>
        ) : error ? (
          <Card>
            <CardContent className='flex h-32 items-center justify-center'>
              <div className='text-red-600'>{error}</div>
            </CardContent>
          </Card>
        ) : wishlists.length === 0 ? (
          <Card>
            <CardContent className='flex h-64 flex-col items-center justify-center text-center'>
              <List className='mb-4 h-12 w-12 text-slate-400' />
              <h3 className='mb-2 text-lg font-medium text-slate-900'>No wishlists yet</h3>
              <p className='mb-4 text-slate-600'>
                Create your first wishlist to start organizing your wishes.
              </p>
              <Button onClick={() => (window.location.href = '/wishlists/new')}>
                <Plus className='mr-2 h-4 w-4' />
                Create Wishlist
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {wishlists.map(wishlist => (
              <Card key={wishlist.id} className='transition-shadow hover:shadow-md'>
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <CardTitle className='text-lg'>{wishlist.name}</CardTitle>
                      <CardDescription className='mt-2'>Wishlist</CardDescription>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Link href={`/wishlists/${wishlist.id}/edit`}>
                        <Button variant='ghost' size='sm'>
                          <Edit className='h-4 w-4' />
                        </Button>
                      </Link>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDelete(wishlist.id)}
                        className='text-red-600 hover:text-red-700'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-slate-600'>Wishes</span>
                      <Badge variant='secondary'>{wishlist.wishes?.length || 0}</Badge>
                    </div>

                    <div className='flex items-center gap-2 text-sm text-slate-600'>
                      <Calendar className='h-4 w-4' />
                      <span>Created {new Date(wishlist.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className='flex gap-2 pt-2'>
                      <Link href={`/wishlists/${wishlist.id}`} className='flex-1'>
                        <Button variant='outline' size='sm' className='w-full'>
                          <Eye className='mr-2 h-4 w-4' />
                          View
                        </Button>
                      </Link>
                      <Link href={`/wishlists/${wishlist.id}/edit`}>
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

export default function WishlistsPage() {
  return (
    <ProtectedRoute>
      <WishlistsContent />
    </ProtectedRoute>
  );
}
