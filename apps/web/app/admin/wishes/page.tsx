'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { 
  PageHeader, 
  LoadingState, 
  ErrorState, 
  DataTableWrapper, 
  TableActions 
} from '@repo/ui';
import { Badge } from '@repo/ui/components/badge';
import { apiClient } from '@/lib/api';
import { ColumnDef } from '@tanstack/react-table';

interface Wish {
  id: string;
  title: string;
  description?: string;
  price?: number;
  url?: string;
  imageUrl?: string;
  priority: 'low' | 'medium' | 'high';
  isPurchased: boolean;
  owner: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  wishlist?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function WishesPage() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getWishes();
      if (response.success && response.data) {
        setWishes(response.data as Wish[]);
      } else {
        setError(response.error || 'Failed to fetch wishes');
      }
    } catch (error) {
      console.error('Error fetching wishes:', error);
      setError('Failed to fetch wishes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleDeleteWish = async (wishId: string) => {
    if (!confirm('Are you sure you want to delete this wish?')) return;

    try {
      const response = await apiClient.deleteWish(wishId);
      if (response.success) {
        setWishes(wishes.filter((wish) => wish.id !== wishId));
      } else {
        alert(response.error || 'Failed to delete wish');
      }
    } catch (error) {
      console.error('Error deleting wish:', error);
      alert('Failed to delete wish');
    }
  };

  const handleAddWish = () => {
    // TODO: Implement add wish functionality
    alert('Add wish functionality coming soon!');
  };

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
            <div className="font-medium text-gray-900">{wish.title}</div>
            {wish.description && (
              <div className="text-sm text-gray-500 truncate max-w-xs">
                {wish.description}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'owner',
      header: 'Owner',
      cell: ({ row }) => {
        const owner = row.original.owner;
        const name = owner.firstName && owner.lastName 
          ? `${owner.firstName} ${owner.lastName}` 
          : 'No name';
        return (
          <div className="text-sm">
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-gray-500">{owner.email}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => (
        <Badge className={getPriorityColor(row.original.priority)}>
          {row.original.priority}
        </Badge>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">
          {row.original.price ? `$${row.original.price.toFixed(2)}` : 'Not set'}
        </div>
      ),
    },
    {
      accessorKey: 'isPurchased',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.isPurchased ? 'default' : 'secondary'}>
          {row.original.isPurchased ? 'Purchased' : 'Available'}
        </Badge>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <TableActions
          onView={() => console.log('View wish:', row.original.id)}
          onEdit={() => console.log('Edit wish:', row.original.id)}
          onDelete={() => handleDeleteWish(row.original.id)}
          externalLink={row.original.url}
          showExternalLink={!!row.original.url}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <LoadingState 
        title="Wishes" 
        description="Manage wish items" 
      />
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Wishes" 
        description="Manage wish items" 
        error={error}
        onRetry={fetchWishes}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wishes"
        description="Manage wish items"
        action={{
          label: 'Add Wish',
          icon: Plus,
          onClick: handleAddWish,
        }}
      />

      <DataTableWrapper
        title="All Wishes"
        description="A list of all wishes in your application"
        columns={columns}
        data={wishes}
        searchKey="title"
        searchPlaceholder="Search wishes..."
      />
    </div>
  );
}
