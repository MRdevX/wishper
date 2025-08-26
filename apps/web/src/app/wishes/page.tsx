'use client';

import { ProtectedRoute } from '@/features/auth/protected-route';
import { WishesLayout, WishesEmptyState, useWishesData } from '@/components/wishes';

function WishesContent() {
  const { gridItems, loading } = useWishesData();

  const emptyState = <WishesEmptyState />;

  return <WishesLayout loading={loading} gridItems={gridItems} emptyState={emptyState} />;
}

export default function WishesPage() {
  return (
    <ProtectedRoute>
      <WishesContent />
    </ProtectedRoute>
  );
}
