'use client';

import { EntityPage } from '@/components/common/entity-page';
import { WishlistForm } from '@/components/wishlists';
import { apiClient } from '@/lib/api-client';
import type { IWishlist } from '@repo/schemas';

export default function NewWishlistPage() {
  return (
    <EntityPage<IWishlist>
      title='Create New Wishlist'
      description='Add a new wishlist to organize your wishes'
      createFn={apiClient.createWishlist}
      FormComponent={WishlistForm}
      mode='create'
      redirectPath='/wishlists'
      entityName='wishlist'
    />
  );
}
