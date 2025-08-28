import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { IWish, IWishlist, IUser } from '@repo/schemas';

// CSS utilities
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

  return formatDate(date);
}

// Text utilities
export function truncateText(text: string, maxLength: number): string {
  return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

// Data transformation
export function transformWishForGrid(wish: IWish) {
  return {
    id: wish.id,
    title: wish.title,
    description: wish.note,
    status: wish.status,
    metadata: [
      ...(wish.wishlist ? [{ icon: '📋', label: 'Wishlist', value: wish.wishlist.name }] : []),
    ],
    createdAt: typeof wish.createdAt === 'string' ? wish.createdAt : wish.createdAt.toISOString(),
  };
}

export function transformWishlistForGrid(wishlist: IWishlist) {
  return {
    id: wishlist.id,
    title: wishlist.name,
    description: 'Wishlist',
    metadata: [{ icon: '🎁', label: 'Wishes', value: wishlist.wishes?.length || 0 }],
    createdAt:
      typeof wishlist.createdAt === 'string'
        ? wishlist.createdAt
        : wishlist.createdAt.toISOString(),
  };
}

export function transformUserForGrid(user: IUser) {
  return {
    id: user.id,
    title: user.name || 'No name provided',
    description: user.email,
    metadata: [{ icon: '📅', label: 'Member since', value: formatDate(user.createdAt) }],
    createdAt: typeof user.createdAt === 'string' ? user.createdAt : user.createdAt.toISOString(),
  };
}

// Search utility
export function searchItems<T>(items: T[], searchTerm: string, searchFields: (keyof T)[]): T[] {
  if (!searchTerm.trim()) return items;

  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(term);
    })
  );
}

// Utility functions
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Performance utilities
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
