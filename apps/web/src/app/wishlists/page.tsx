'use client';

import { ProtectedRoute } from '@/features/auth/protected-route';
import { WishlistsLayout, WishlistsEmptyState, useWishlistsData } from '@/components/wishlists';

function WishlistsContent() {
  const { gridItems, loading } = useWishlistsData();

  const emptyState = <WishlistsEmptyState />;

  return <WishlistsLayout loading={loading} gridItems={gridItems} emptyState={emptyState} />;
}

export default function WishlistsPage() {
  return (
    <ProtectedRoute>
      <WishlistsContent />
    </ProtectedRoute>
  );
}
