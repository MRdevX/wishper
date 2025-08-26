export const APP_CONFIG = {
  name: 'Wishper',
  description: 'Your Personal Wishlist App',
  version: '1.0.0',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.wishper.link/api',
} as const;

export const ROUTES = {
  home: '/',
  auth: '/auth',
  dashboard: '/dashboard',
  profile: '/profile',
  settings: '/settings',
  wishes: '/wishes',
  wishlists: '/wishlists',
  admin: {
    root: '/admin',
    users: '/admin/users',
    wishes: '/admin/wishes',
    wishlists: '/admin/wishlists',
    settings: '/admin/settings',
  },
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  users: '/users',
  wishes: '/wishes',
  wishlists: '/wishlists',
} as const;

export const STORAGE_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  theme: 'theme',
  user: 'user',
} as const;

export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 10,
  maxLimit: 100,
} as const;

export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to access this resource.',
  forbidden: 'Access forbidden.',
  notFound: 'Resource not found.',
  serverError: 'Server error. Please try again later.',
  validation: 'Please check your input and try again.',
  unknown: 'An unknown error occurred.',
} as const;

export const SUCCESS_MESSAGES = {
  created: 'Successfully created.',
  updated: 'Successfully updated.',
  deleted: 'Successfully deleted.',
  saved: 'Successfully saved.',
} as const;
