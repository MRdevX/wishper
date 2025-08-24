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
import { useCrud } from '../../hooks/use-crud';
import { ProtectedRoute } from '../../components/auth/protected-route';
import { apiClient, Wish, WishStatus } from '../../lib/api';
import { Gift, Plus, Edit, Trash2, Eye, Calendar, DollarSign, Tag } from 'lucide-react';
import Link from 'next/link';

function WishesContent() {
  const [state, actions] = useCrud<Wish>({
    get: apiClient.getWishes,
    create: apiClient.createWish,
    update: apiClient.updateWish,
    delete: apiClient.deleteWish,
  });

  useEffect(() => {
    actions.fetchItems();
  }, [actions]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this wish?')) {
      try {
        await actions.deleteItem(id);
      } catch (error) {
        console.error('Error deleting wish:', error);
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
          <Button onClick={actions.showCreateForm}>
            <Plus className='mr-2 h-4 w-4' />
            New Wish
          </Button>
        </div>

        {/* Wishes Grid */}
        {state.loading ? (
          <div className='flex h-64 items-center justify-center'>
            <div className='text-slate-600'>Loading wishes...</div>
          </div>
        ) : state.error ? (
          <Card>
            <CardContent className='flex h-32 items-center justify-center'>
              <div className='text-red-600'>{state.error}</div>
            </CardContent>
          </Card>
        ) : state.items.length === 0 ? (
          <Card>
            <CardContent className='flex h-64 flex-col items-center justify-center text-center'>
              <Gift className='mb-4 h-12 w-12 text-slate-400' />
              <h3 className='mb-2 text-lg font-medium text-slate-900'>No wishes yet</h3>
              <p className='mb-4 text-slate-600'>
                Add your first wish to start building your wishlist.
              </p>
              <Button onClick={actions.showCreateForm}>
                <Plus className='mr-2 h-4 w-4' />
                Add Wish
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {state.items.map(wish => (
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
                      <Button variant='ghost' size='sm' onClick={() => actions.showEditForm(wish)}>
                        <Edit className='h-4 w-4' />
                      </Button>
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

        {/* Create/Edit Form Modal */}
        {state.showForm && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4'>
            <Card className='w-full max-w-md'>
              <CardHeader>
                <CardTitle>{state.editingItem ? 'Edit Wish' : 'Add New Wish'}</CardTitle>
                <CardDescription>
                  {state.editingItem
                    ? 'Update your wish information.'
                    : 'Add a new wish to your wishlist.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WishForm
                  wish={state.editingItem}
                  onSubmit={async data => {
                    try {
                      if (state.editingItem) {
                        await actions.updateItem(state.editingItem.id, data);
                      } else {
                        await actions.createItem(data);
                      }
                    } catch (error) {
                      console.error('Error saving wish:', error);
                    }
                  }}
                  onCancel={actions.hideForm}
                  loading={state.formLoading}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

interface IWishFormProps {
  wish?: Wish | null;
  onSubmit: (data: {
    title: string;
    details?: {
      description?: string;
      price?: number;
      url?: string;
      imageUrl?: string;
      priority?: 'low' | 'medium' | 'high';
    };
    status?: WishStatus;
    wishlistId?: string;
  }) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

function WishForm({ wish, onSubmit, onCancel, loading }: IWishFormProps) {
  const [formData, setFormData] = useState({
    title: wish?.title || '',
    description: wish?.details?.description || '',
    price: wish?.details?.price || '',
    status: wish?.status || WishStatus.ACTIVE,
    wishlistId: wish?.wishlist?.id || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    await onSubmit({
      title: formData.title.trim(),
      details: {
        description: formData.description.trim() || undefined,
        price: formData.price ? parseFloat(formData.price.toString()) : undefined,
      },
      status: formData.status as WishStatus,
      wishlistId: formData.wishlistId || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <label htmlFor='title' className='text-sm font-medium'>
          Title *
        </label>
        <input
          id='title'
          type='text'
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className='w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500'
          placeholder='Enter wish title'
          required
          disabled={loading}
        />
      </div>

      <div className='space-y-2'>
        <label htmlFor='description' className='text-sm font-medium'>
          Description
        </label>
        <textarea
          id='description'
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className='w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500'
          placeholder='Enter description (optional)'
          rows={3}
          disabled={loading}
        />
      </div>

      <div className='space-y-2'>
        <label htmlFor='price' className='text-sm font-medium'>
          Price
        </label>
        <input
          id='price'
          type='number'
          step='0.01'
          min='0'
          value={formData.price}
          onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
          className='w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500'
          placeholder='Enter price (optional)'
          disabled={loading}
        />
      </div>

      <div className='space-y-2'>
        <label htmlFor='status' className='text-sm font-medium'>
          Status
        </label>
        <select
          id='status'
          value={formData.status}
          onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as WishStatus }))}
          className='w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500'
          disabled={loading}
        >
          <option value={WishStatus.ACTIVE}>Active</option>
          <option value={WishStatus.ACHIEVED}>Achieved</option>
          <option value={WishStatus.ARCHIVED}>Archived</option>
        </select>
      </div>

      <div className='flex gap-3 pt-4'>
        <Button type='submit' disabled={loading || !formData.title.trim()}>
          {loading ? 'Saving...' : wish ? 'Update' : 'Create'}
        </Button>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function WishesPage() {
  return (
    <ProtectedRoute>
      <WishesContent />
    </ProtectedRoute>
  );
}
