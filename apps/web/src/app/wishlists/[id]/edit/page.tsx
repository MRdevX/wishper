'use client';

import { EntityPage } from '@/components/common/entity-page';
import { WishlistForm } from '@/components/wishlists';
import { apiClient } from '@/lib/api-client';
import type { IWishlist } from '@repo/schemas';

export default function EditWishlistPage() {
  return (
    <EntityPage<IWishlist>
      title='Edit Wishlist'
      description='Update your wishlist details'
      fetchFn={apiClient.getWishlist}
      updateFn={apiClient.updateWishlist}
      FormComponent={WishlistForm}
      mode='edit'
      redirectPath='/wishlists'
      entityName='wishlist'
    />
  );
}
