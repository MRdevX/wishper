'use client';

import { EntityPage } from '@/components/common/entity-page';
import { WishForm } from '@/components/wishes/wish-form';
import { apiClient } from '@/lib/api-client';
import type { IWish } from '@repo/schemas';

export default function NewWishPage() {
  return (
    <EntityPage<IWish>
      title='Create New Wish'
      description='Add a new wish to your collection'
      createFn={apiClient.createWish}
      FormComponent={WishForm}
      mode='create'
      redirectPath='/wishes'
      entityName='wish'
    />
  );
}
