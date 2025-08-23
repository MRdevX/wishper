'use client';

import { AdminPage } from '@/components/admin/admin-page';
import { WishlistForm } from '@repo/ui';
import { Gift } from 'lucide-react';
import { apiClient, Wishlist } from '@/lib/api';
import { ColumnDef } from '@tanstack/react-table';

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
          <div className='font-medium text-gray-900'>{owner?.name || 'No name'}</div>
          <div className='text-gray-500'>{owner?.email || '—'}</div>
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
];

export default function WishlistsPage() {
  return (
    <AdminPage
      title='Wishlists'
      description='Manage wishlists'
      columns={columns}
      apiMethods={{
        get: apiClient.getWishlists,
        create: apiClient.createWishlist,
        update: apiClient.updateWishlist,
        delete: apiClient.deleteWishlist,
      }}
      searchKey='name'
      searchPlaceholder='Search wishlists...'
      FormComponent={WishlistForm}
    />
  );
}
