'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/features/auth/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageLayout } from '@/components/layout/page-layout';
import { WishForm } from '@/components/wishes/wish-form';
import { LoadingState, ErrorState, useToast } from '@repo/ui';
import { apiClient } from '@/lib/api-client';
import type { IWish, IUpdateWishDto } from '@repo/schemas';

export default function EditWishPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [wish, setWish] = useState<IWish | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSubmit = async (data: IUpdateWishDto) => {
    try {
      setSaving(true);
      const response = await apiClient.updateWish(wishId, data);

      if (response.success) {
        showToast('Wish updated successfully!', 'success');
        router.push(`/wishes/${wishId}`);
      } else {
        showToast(`Failed to update wish: ${response.error}`, 'error');
      }
    } catch (error) {
      showToast('An error occurred while updating the wish', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/wishes/${wishId}`);
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
            description="The wish you're looking for doesn't exist or you don't have permission to edit it"
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
        <PageLayout title='Edit Wish' description='Update your wish details'>
          <WishForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={saving}
            mode='edit'
            initialData={{
              title: wish.title,
              note: wish.note,
              status: wish.status,
              details: wish.details,
              wishlistId: wish.wishlist?.id,
            }}
          />
        </PageLayout>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
