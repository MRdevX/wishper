export { apiClient } from './api-client';
export { env } from './env';
export { cn } from './utils';

export {
  DataService,
  wishService,
  wishlistService,
  userService,
  DashboardService,
} from '../services/data-service';

export { useDataFetching, useMutation } from '../hooks/use-data-fetching';

export {
  formatDate,
  formatRelativeDate,
  formatCurrency,
  truncateText,
  capitalizeFirst,
  transformWishForGrid,
  transformWishlistForGrid,
  transformUserForGrid,
  validateEmail,
  validatePassword,
  searchItems,
} from '../utils/formatters';

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
