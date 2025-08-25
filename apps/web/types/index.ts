export interface AppConfig {
  apiUrl: string;
  appName: string;
  version: string;
}

export interface RouteConfig {
  path: string;
  name: string;
  protected?: boolean;
  adminOnly?: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export type {
  IApiResponse as ApiResponse,
  IUser as User,
  IWish as Wish,
  IWishlist as Wishlist,
  IWishDetails as WishDetails,
  ICreateUserDto as CreateUserDto,
  IUpdateUserDto as UpdateUserDto,
  ICreateWishDto as CreateWishDto,
  IUpdateWishDto as UpdateWishDto,
  ICreateWishlistDto as CreateWishlistDto,
  IUpdateWishlistDto as UpdateWishlistDto,
  ILoginDto as LoginDto,
  IRegisterDto as RegisterDto,
  IRefreshTokenDto as RefreshTokenDto,
  IForgotPasswordDto as ForgotPasswordDto,
  IResetPasswordDto as ResetPasswordDto,
  IAuthResponse as AuthResponse,
  IUserWithoutPassword as UserWithoutPassword,
  ITokenPair as TokenPair,
} from '@repo/schemas';

export { WishStatus } from '@repo/schemas';
