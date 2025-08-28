'use client';

import { EntityPage } from '@/components/common/entity-page';
import { apiClient } from '@/lib/api-client';
import type { IWishlist } from '@repo/schemas';
import { WishlistDetails } from '@/components';

export default function WishlistDetailsPage() {
  return (
    <EntityPage<IWishlist>
      title='Wishlist Details'
      description='View and manage your wishlist'
      fetchFn={apiClient.getWishlist}
      deleteFn={apiClient.deleteWishlist}
      DetailsComponent={WishlistDetails}
      mode='view'
      redirectPath='/wishlists'
      entityName='wishlist'
    />
  );
}
