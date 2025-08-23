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
import { apiClient, Wishlist } from '../../lib/api';
import { List, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import Link from 'next/link';

function WishlistsContent() {
  const [state, actions] = useCrud<Wishlist>({
    get: apiClient.getWishlists,
    create: apiClient.createWishlist,
    update: apiClient.updateWishlist,
    delete: apiClient.deleteWishlist,
  });

  useEffect(() => {
    actions.fetchItems();
  }, [actions]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this wishlist?')) {
      try {
        await actions.deleteItem(id);
      } catch (error) {
        console.error('Error deleting wishlist:', error);
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
          <Button onClick={actions.showCreateForm}>
            <Plus className='mr-2 h-4 w-4' />
            New Wishlist
          </Button>
        </div>

        {/* Wishlists Grid */}
        {state.loading ? (
          <div className='flex h-64 items-center justify-center'>
            <div className='text-slate-600'>Loading wishlists...</div>
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
              <List className='mb-4 h-12 w-12 text-slate-400' />
              <h3 className='mb-2 text-lg font-medium text-slate-900'>No wishlists yet</h3>
              <p className='mb-4 text-slate-600'>
                Create your first wishlist to start organizing your wishes.
              </p>
              <Button onClick={actions.showCreateForm}>
                <Plus className='mr-2 h-4 w-4' />
                Create Wishlist
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {state.items.map(wishlist => (
              <Card key={wishlist.id} className='transition-shadow hover:shadow-md'>
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <CardTitle className='text-lg'>{wishlist.name}</CardTitle>
                      <CardDescription className='mt-2'>Wishlist</CardDescription>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => actions.showEditForm(wishlist)}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
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

        {/* Create/Edit Form Modal */}
        {state.showForm && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4'>
            <Card className='w-full max-w-md'>
              <CardHeader>
                <CardTitle>{state.editingItem ? 'Edit Wishlist' : 'Create New Wishlist'}</CardTitle>
                <CardDescription>
                  {state.editingItem
                    ? 'Update your wishlist information.'
                    : 'Create a new wishlist to organize your wishes.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WishlistForm
                  wishlist={state.editingItem}
                  onSubmit={async data => {
                    try {
                      if (state.editingItem) {
                        await actions.updateItem(state.editingItem.id, data);
                      } else {
                        await actions.createItem(data);
                      }
                    } catch (error) {
                      console.error('Error saving wishlist:', error);
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

interface IWishlistFormProps {
  wishlist?: Wishlist | null;
  onSubmit: (data: { name: string; description?: string }) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

function WishlistForm({ wishlist, onSubmit, onCancel, loading }: IWishlistFormProps) {
  const [formData, setFormData] = useState({
    name: wishlist?.name || '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    await onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <label htmlFor='name' className='text-sm font-medium'>
          Name *
        </label>
        <input
          id='name'
          type='text'
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className='w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500'
          placeholder='Enter wishlist name'
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

      <div className='flex gap-3 pt-4'>
        <Button type='submit' disabled={loading || !formData.name.trim()}>
          {loading ? 'Saving...' : wishlist ? 'Update' : 'Create'}
        </Button>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function WishlistsPage() {
  return (
    <ProtectedRoute>
      <WishlistsContent />
    </ProtectedRoute>
  );
}
