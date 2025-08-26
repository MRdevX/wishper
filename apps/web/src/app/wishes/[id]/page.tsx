'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/features/auth/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageLayout } from '@/components/layout/page-layout';
import { WishDetails } from '@/components/wishes/wish-details';
import { LoadingState, ErrorState } from '@repo/ui';
import { apiClient } from '@/lib/api-client';
import type { IWish } from '@repo/schemas';

export default function WishDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [wish, setWish] = useState<IWish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const wishId = params.id as string;

  useEffect(() => {
    const fetchWish = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getWish(wishId);

        if (response.success && response.data) {
          setWish(response.data);
        } else {
          setError(response.error || 'Failed to load wish');
        }
      } catch (err) {
        setError('An error occurred while loading the wish');
      } finally {
        setLoading(false);
      }
    };

    if (wishId) {
      fetchWish();
    }
  }, [wishId]);

  const handleEdit = () => {
    router.push(`/wishes/${wishId}/edit`);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this wish?')) {
      try {
        const response = await apiClient.deleteWish(wishId);
        if (response.success) {
          router.push('/wishes');
        } else {
          alert(`Failed to delete wish: ${response.error}`);
        }
      } catch (error) {
        alert('An error occurred while deleting the wish');
      }
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <LoadingState
            title='Loading Wish'
            description='Please wait while we load the wish details'
          />
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error || !wish) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <ErrorState
            title='Wish Not Found'
            description="The wish you're looking for doesn't exist or you don't have permission to view it"
            error={error || 'Wish not found'}
            onRetry={() => window.location.reload()}
          />
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PageLayout
          title={wish.title}
          description='Wish details'
          actions={
            <div className='flex gap-2'>
              <button
                onClick={handleEdit}
                className='inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className='inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              >
                Delete
              </button>
            </div>
          }
        >
          <WishDetails wish={wish} />
        </PageLayout>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
