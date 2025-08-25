export { apiClient } from './api-client';

export {
  cn,
  formatDate,
  formatRelativeTime,
  truncateText,
  getInitials,
  isValidEmail,
  debounce,
  throttle,
  generateId,
  capitalize,
  formatCurrency,
  isEmpty,
} from './utils';

export type {
  AppConfig,
  RouteConfig,
  LoadingState,
  PaginationParams,
  ApiError,
  ApiResponse,
  User,
  Wish,
  Wishlist,
  WishDetails,
  CreateUserDto,
  UpdateUserDto,
  CreateWishDto,
  UpdateWishDto,
  CreateWishlistDto,
  UpdateWishlistDto,
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  AuthResponse,
  UserWithoutPassword,
  TokenPair,
} from '../types';

export {
  APP_CONFIG,
  ROUTES,
  API_ENDPOINTS,
  STORAGE_KEYS,
  PAGINATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '../constants';

export { WishStatus } from '../types';
