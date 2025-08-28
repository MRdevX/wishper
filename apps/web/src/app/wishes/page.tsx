'use client';

import { PageWrapper } from '@/components/common';
import { WishesLayout, WishesEmptyState, useWishesData } from '@/components/wishes';

function WishesContent() {
  const { gridItems, loading } = useWishesData();

  const emptyState = <WishesEmptyState />;

  return <WishesLayout gridItems={gridItems} emptyState={emptyState} />;
}

export default function WishesPage() {
  return (
    <PageWrapper>
      <WishesContent />
    </PageWrapper>
  );
}
