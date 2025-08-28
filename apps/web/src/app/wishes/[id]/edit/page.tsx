'use client';

import { EntityPage } from '@/components/common/entity-page';
import { WishForm } from '@/components/wishes/wish-form';
import { apiClient } from '@/lib/api-client';
import type { IWish } from '@repo/schemas';

export default function EditWishPage() {
  return (
    <EntityPage<IWish>
      title='Edit Wish'
      description='Update your wish details'
      fetchFn={apiClient.getWish}
      updateFn={apiClient.updateWish}
      FormComponent={WishForm}
      mode='edit'
      redirectPath='/wishes'
      entityName='wish'
    />
  );
}
