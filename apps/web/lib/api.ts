import {
  IApiResponse,
  IUser,
  IWish,
  IWishlist,
  IWishDetails,
  ICreateUserDto,
  IUpdateUserDto,
  ICreateWishDto,
  IUpdateWishDto,
  ICreateWishlistDto,
  IUpdateWishlistDto,
  ILoginDto,
  IRegisterDto,
  IRefreshTokenDto,
  IForgotPasswordDto,
  IResetPasswordDto,
  IAuthResponse,
  IUserWithoutPassword,
  ITokenPair,
} from '@repo/schemas';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wishper.link/api';

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
};

export { WishStatus } from '@repo/schemas';

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;

    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<IApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const config: RequestInit = {
      headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  async login(loginData: ILoginDto): Promise<IApiResponse<IAuthResponse>> {
    const response = await this.request<IAuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });

    if (response.success && response.data) {
      this.setAccessToken(response.data.tokens.accessToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
      }
    }

    return response;
  }

  async register(registerData: IRegisterDto): Promise<IApiResponse<IAuthResponse>> {
    const response = await this.request<IAuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(registerData),
    });

    if (response.success && response.data) {
      this.setAccessToken(response.data.tokens.accessToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
      }
    }

    return response;
  }

  async refreshToken(): Promise<IApiResponse<ITokenPair>> {
    const refreshToken =
      typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

    if (!refreshToken) {
      return {
        success: false,
        error: 'No refresh token available',
      };
    }

    const response = await this.request<ITokenPair>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    if (response.success && response.data) {
      this.setAccessToken(response.data.accessToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }

    return response;
  }

  async logout(): Promise<IApiResponse<void>> {
    const response = await this.request<void>('/auth/logout', {
      method: 'POST',
    });

    this.clearTokens();
    return response;
  }

  async forgotPassword(
    forgotPasswordData: IForgotPasswordDto
  ): Promise<IApiResponse<{ message: string }>> {
    return this.request<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(forgotPasswordData),
    });
  }

  async resetPassword(
    resetPasswordData: IResetPasswordDto
  ): Promise<IApiResponse<{ message: string }>> {
    return this.request<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetPasswordData),
    });
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearTokens(): void {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  async getUsers() {
    return this.request('/users');
  }

  async getUser(id: string) {
    return this.request(`/users/${id}`);
  }

  async createUser(userData: Record<string, unknown>) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: IUpdateUserDto) {
    return this.request(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  async getWishes() {
    return this.request('/wishes');
  }

  async getWish(id: string) {
    return this.request(`/wishes/${id}`);
  }

  async createWish(wishData: Record<string, unknown>, ownerId?: string) {
    const url = ownerId ? `/wishes?ownerId=${ownerId}` : '/wishes';
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(wishData),
    });
  }

  async updateWish(id: string, wishData: Record<string, unknown>) {
    return this.request(`/wishes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(wishData),
    });
  }

  async deleteWish(id: string) {
    return this.request(`/wishes/${id}`, {
      method: 'DELETE',
    });
  }

  async getWishlists() {
    return this.request('/wishlists');
  }

  async getWishlist(id: string) {
    return this.request(`/wishlists/${id}`);
  }

  async createWishlist(wishlistData: Record<string, unknown>, ownerId?: string) {
    const url = ownerId ? `/wishlists?ownerId=${ownerId}` : '/wishlists';
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(wishlistData),
    });
  }

  async updateWishlist(id: string, wishlistData: Record<string, unknown>) {
    return this.request(`/wishlists/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(wishlistData),
    });
  }

  async deleteWishlist(id: string) {
    return this.request(`/wishlists/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
