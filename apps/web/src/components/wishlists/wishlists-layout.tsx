import { EntityLayout } from '../common/entity-layout';

interface IWishlistsLayoutProps {
  gridItems: any[];
  emptyState?: React.ReactNode;
}

export function WishlistsLayout({ gridItems, emptyState }: IWishlistsLayoutProps) {
  return (
    <EntityLayout
      title='Wishlists'
      description='Manage your wishlists and organize your wishes.'
      newItemHref='/wishlists/new'
      newItemText='New Wishlist'
      gridItems={gridItems}
      emptyState={emptyState}
    />
  );
}
