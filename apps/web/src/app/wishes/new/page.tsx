'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/features/auth/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageLayout } from '@/components/layout/page-layout';
import { WishForm } from '@/components/wishes';
import { useToast } from '@repo/ui';
import { apiClient } from '@/lib/api-client';
import type { ICreateWishDto, IUpdateWishDto } from '@repo/schemas';

export default function NewWishPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ICreateWishDto | IUpdateWishDto) => {
    try {
      setLoading(true);
      const response = await apiClient.createWish(data as ICreateWishDto);

      if (response.success) {
        showToast('Wish created successfully!', 'success');
        router.push('/wishes');
      } else {
        showToast(`Failed to create wish: ${response.error}`, 'error');
      }
    } catch (error) {
      showToast('An error occurred while creating the wish', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/wishes');
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PageLayout title='Create New Wish' description='Add a new wish to your collection'>
          <WishForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
            mode='create'
          />
        </PageLayout>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
