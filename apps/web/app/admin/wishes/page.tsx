'use client';

import { AdminPage } from '@/components/admin/admin-page';
import { WishForm } from '@repo/ui';
import { Badge } from '@repo/ui/components/badge';
import { apiClient, Wish, WishStatus, WishDetails } from '@/lib/api';
import { ColumnDef } from '@tanstack/react-table';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const columns: ColumnDef<Wish>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const wish = row.original;
      return (
        <div>
          <div className='font-medium text-gray-900'>{wish.title}</div>
          {wish.note && <div className='max-w-xs truncate text-sm text-gray-500'>{wish.note}</div>}
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        [WishStatus.ACTIVE]: 'bg-green-100 text-green-800 border-green-200',
        [WishStatus.ACHIEVED]: 'bg-blue-100 text-blue-800 border-blue-200',
        [WishStatus.ARCHIVED]: 'bg-gray-100 text-gray-800 border-gray-200',
      };
      return (
        <Badge className={statusColors[status] || 'border-gray-200 bg-gray-100 text-gray-800'}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'details',
    header: 'Details',
    cell: ({ row }) => {
      const details = row.original.details as WishDetails;
      return (
        <div className='text-sm text-gray-700'>
          {details.price ? `$${details.price.toFixed(2)}` : 'No price'}
          {details.priority && (
            <div className='mt-1'>
              <Badge className={getPriorityColor(details.priority)}>{details.priority}</Badge>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'wishlist',
    header: 'Wishlist',
    cell: ({ row }) => (
      <div className='text-sm text-gray-700'>{row.original.wishlist?.name || 'No wishlist'}</div>
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

export default function WishesPage() {
  return (
    <AdminPage
      title='Wishes'
      description='Manage wish items'
      columns={columns}
      apiMethods={{
        get: apiClient.getWishes,
        create: apiClient.createWish,
        update: apiClient.updateWish,
        delete: apiClient.deleteWish,
      }}
      searchKey='title'
      searchPlaceholder='Search wishes...'
      FormComponent={WishForm}
    />
  );
}
