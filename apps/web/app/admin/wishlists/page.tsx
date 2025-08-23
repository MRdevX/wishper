'use client';

import { useState, useEffect } from 'react';
import { Plus, Gift } from 'lucide-react';
import {
  PageHeader,
  LoadingState,
  ErrorState,
  DataTableWrapper,
  TableActions,
  WishlistForm,
  useToast,
} from '@repo/ui';

import { apiClient, Wishlist } from '@/lib/api';
import { ColumnDef } from '@tanstack/react-table';

export default function WishlistsPage() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWishlistForm, setShowWishlistForm] = useState(false);
  const [editingWishlist, setEditingWishlist] = useState<Wishlist | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const { showToast } = useToast();

  const fetchWishlists = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getWishlists();
      if (response.success && response.data) {
        setWishlists(response.data as Wishlist[]);
      } else {
        setError(response.error || 'Failed to fetch wishlists');
      }
    } catch (error) {
      console.error('Error fetching wishlists:', error);
      setError('Failed to fetch wishlists');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  const handleDeleteWishlist = async (wishlistId: string) => {
    if (!confirm('Are you sure you want to delete this wishlist?')) return;

    try {
      const response = await apiClient.deleteWishlist(wishlistId);
      if (response.success) {
        setWishlists(wishlists.filter(wishlist => wishlist.id !== wishlistId));
        showToast('Wishlist deleted successfully', 'success');
      } else {
        showToast(response.error || 'Failed to delete wishlist', 'error');
      }
    } catch (error) {
      console.error('Error deleting wishlist:', error);
      showToast('Failed to delete wishlist', 'error');
    }
  };

  const handleAddWishlist = () => {
    setEditingWishlist(null);
    setShowWishlistForm(true);
  };

  const handleEditWishlist = (wishlist: Wishlist) => {
    setEditingWishlist(wishlist);
    setShowWishlistForm(true);
  };

  const handleSaveWishlist = async (wishlistData: any) => {
    try {
      setFormLoading(true);
      if (editingWishlist) {
        const response = await apiClient.updateWishlist(editingWishlist.id, wishlistData);
        if (response.success && response.data) {
          setWishlists(
            wishlists.map(wishlist =>
              wishlist.id === editingWishlist.id ? (response.data as Wishlist) : wishlist
            )
          );
          setShowWishlistForm(false);
          setEditingWishlist(null);
          showToast('Wishlist updated successfully', 'success');
        } else {
          showToast(response.error || 'Failed to update wishlist', 'error');
        }
      } else {
        const response = await apiClient.createWishlist(wishlistData);
        if (response.success && response.data) {
          setWishlists([...wishlists, response.data as Wishlist]);
          setShowWishlistForm(false);
          showToast('Wishlist created successfully', 'success');
        } else {
          showToast(response.error || 'Failed to create wishlist', 'error');
        }
      }
    } catch (error) {
      console.error('Error saving wishlist:', error);
      showToast('Failed to save wishlist', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const columns: ColumnDef<Wishlist>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const wishlist = row.original;
        return (
          <div>
            <div className='font-medium text-gray-900'>{wishlist.name}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'owner',
      header: 'Owner',
      cell: ({ row }) => {
        const owner = row.original.owner;
        return (
          <div className='text-sm'>
            <div className='font-medium text-gray-900'>{owner.name || 'No name'}</div>
            <div className='text-gray-500'>{owner.email}</div>
          </div>
        );
      },
    },

    {
      accessorKey: 'wishes',
      header: 'Wishes Count',
      cell: ({ row }) => (
        <div className='flex items-center'>
          <Gift className='mr-1 h-4 w-4 text-gray-400' />
          <span className='text-sm text-gray-700'>{row.original.wishes?.length || 0} wishes</span>
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => (
        <div className='text-sm text-gray-500'>
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <TableActions
          onView={() => console.log('View wishlist:', row.original.id)}
          onEdit={() => handleEditWishlist(row.original)}
          onDelete={() => handleDeleteWishlist(row.original.id)}
        />
      ),
    },
  ];

  if (loading) {
    return <LoadingState title='Wishlists' description='Manage wishlists' />;
  }

  if (error) {
    return (
      <ErrorState
        title='Wishlists'
        description='Manage wishlists'
        error={error}
        onRetry={fetchWishlists}
      />
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Wishlists'
        description='Manage wishlists'
        action={{
          label: 'Add Wishlist',
          icon: Plus,
          onClick: handleAddWishlist,
        }}
      />

      <DataTableWrapper
        title='All Wishlists'
        description='A list of all wishlists in your application'
        columns={columns}
        data={wishlists}
        searchKey='name'
        searchPlaceholder='Search wishlists...'
      />

      {showWishlistForm && (
        <WishlistForm
          onSubmit={handleSaveWishlist}
          onCancel={() => {
            setShowWishlistForm(false);
            setEditingWishlist(null);
          }}
          loading={formLoading}
          initialData={
            editingWishlist
              ? {
                  name: editingWishlist.name,
                }
              : undefined
          }
          mode={editingWishlist ? 'edit' : 'create'}
        />
      )}
    </div>
  );
}
