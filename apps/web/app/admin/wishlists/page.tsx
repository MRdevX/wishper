'use client';

import { useState, useEffect } from 'react';
import { Plus, Gift } from 'lucide-react';
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

interface Wishlist {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  owner: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  wishes?: {
    id: string;
    title: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export default function WishlistsPage() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setWishlists(wishlists.filter((wishlist) => wishlist.id !== wishlistId));
      } else {
        alert(response.error || 'Failed to delete wishlist');
      }
    } catch (error) {
      console.error('Error deleting wishlist:', error);
      alert('Failed to delete wishlist');
    }
  };

  const handleAddWishlist = () => {
    // TODO: Implement add wishlist functionality
    alert('Add wishlist functionality coming soon!');
  };

  const columns: ColumnDef<Wishlist>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const wishlist = row.original;
        return (
          <div>
            <div className="font-medium text-gray-900">{wishlist.name}</div>
            {wishlist.description && (
              <div className="text-sm text-gray-500 truncate max-w-xs">
                {wishlist.description}
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
      accessorKey: 'isPublic',
      header: 'Visibility',
      cell: ({ row }) => (
        <Badge variant={row.original.isPublic ? 'default' : 'secondary'}>
          {row.original.isPublic ? 'Public' : 'Private'}
        </Badge>
      ),
    },
    {
      accessorKey: 'wishes',
      header: 'Wishes Count',
      cell: ({ row }) => (
        <div className="flex items-center">
          <Gift className="w-4 h-4 mr-1 text-gray-400" />
          <span className="text-sm text-gray-700">
            {row.original.wishes?.length || 0} wishes
          </span>
        </div>
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
          onView={() => console.log('View wishlist:', row.original.id)}
          onEdit={() => console.log('Edit wishlist:', row.original.id)}
          onDelete={() => handleDeleteWishlist(row.original.id)}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <LoadingState 
        title="Wishlists" 
        description="Manage wishlists" 
      />
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Wishlists" 
        description="Manage wishlists" 
        error={error}
        onRetry={fetchWishlists}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wishlists"
        description="Manage wishlists"
        action={{
          label: 'Add Wishlist',
          icon: Plus,
          onClick: handleAddWishlist,
        }}
      />

      <DataTableWrapper
        title="All Wishlists"
        description="A list of all wishlists in your application"
        columns={columns}
        data={wishlists}
        searchKey="name"
        searchPlaceholder="Search wishlists..."
      />
    </div>
  );
}
