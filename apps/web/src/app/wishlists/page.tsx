'use client';

import { PageWrapper } from '@/components/common';
import { WishlistsLayout, WishlistsEmptyState, useWishlistsData } from '@/components/wishlists';

function WishlistsContent() {
  const { gridItems, loading } = useWishlistsData();

  const emptyState = <WishlistsEmptyState />;

  return <WishlistsLayout loading={loading} gridItems={gridItems} emptyState={emptyState} />;
}

export default function WishlistsPage() {
  return (
    <PageWrapper>
      <WishlistsContent />
    </PageWrapper>
  );
}
