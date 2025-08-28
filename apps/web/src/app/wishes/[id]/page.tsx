'use client';

import { EntityPage } from '@/components/common/entity-page';
import { WishDetails } from '@/components/wishes/wish-details';
import { apiClient } from '@/lib/api-client';
import type { IWish } from '@repo/schemas';

export default function WishDetailsPage() {
  return (
    <EntityPage<IWish>
      title='Wish Details'
      description='View and manage your wish'
      fetchFn={apiClient.getWish}
      deleteFn={apiClient.deleteWish}
      DetailsComponent={WishDetails}
      mode='view'
      redirectPath='/wishes'
      entityName='wish'
    />
  );
}
