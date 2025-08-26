import type { IWish, IWishlist, IUser } from '@repo/schemas';

export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
};

export const formatRelativeDate = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

export const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const capitalizeFirst = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const transformWishForGrid = (wish: IWish) => ({
  id: wish.id,
  title: wish.title,
  description: wish.details?.description,
  status: wish.status,
  metadata: [
    ...(wish.details?.price
      ? [{ icon: '$', label: 'Price', value: formatCurrency(wish.details.price) }]
      : []),
    ...(wish.wishlist ? [{ icon: '📋', label: 'Wishlist', value: wish.wishlist.name }] : []),
  ],
  createdAt: typeof wish.createdAt === 'string' ? wish.createdAt : wish.createdAt.toISOString(),
});

export const transformWishlistForGrid = (wishlist: IWishlist) => ({
  id: wishlist.id,
  title: wishlist.name,
  description: 'Wishlist',
  metadata: [{ icon: '🎁', label: 'Wishes', value: wishlist.wishes?.length || 0 }],
  createdAt:
    typeof wishlist.createdAt === 'string' ? wishlist.createdAt : wishlist.createdAt.toISOString(),
});

export const transformUserForGrid = (user: IUser) => ({
  id: user.id,
  title: user.name || 'No name provided',
  description: user.email,
  metadata: [{ icon: '📅', label: 'Member since', value: formatDate(user.createdAt) }],
  createdAt: typeof user.createdAt === 'string' ? user.createdAt : user.createdAt.toISOString(),
});

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 6;
};

export const searchItems = <T>(items: T[], searchTerm: string, searchFields: (keyof T)[]) => {
  if (!searchTerm.trim()) return items;

  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(term);
    })
  );
};
