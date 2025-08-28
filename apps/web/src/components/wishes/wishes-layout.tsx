import { EntityLayout } from '../common/entity-layout';

interface IWishesLayoutProps {
  gridItems: any[];
  emptyState?: React.ReactNode;
}

export function WishesLayout({ gridItems, emptyState }: IWishesLayoutProps) {
  return (
    <EntityLayout
      title='Wishes'
      description='Manage your wishes and track their status.'
      newItemHref='/wishes/new'
      newItemText='New Wish'
      gridItems={gridItems}
      emptyState={emptyState}
    />
  );
}
