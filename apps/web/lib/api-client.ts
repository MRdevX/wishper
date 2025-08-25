import { API_ENDPOINTS, STORAGE_KEYS, ERROR_MESSAGES } from '@/constants';
import { env } from './env';
import type {
  ApiResponse,
  AuthResponse,
  TokenPair,
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UpdateUserDto,
  CreateWishDto,
  UpdateWishDto,
  CreateWishlistDto,
  UpdateWishlistDto,
  User,
  Wish,
  Wishlist,
} from '@/types';

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.initializeToken();
  }

  private initializeToken(): void {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem(STORAGE_KEYS.accessToken);
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
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

      let data;
      try {
        data = await response.json();
      } catch (_jsonError) {
        return {
          success: false,
          error: `Invalid JSON response: ${response.status} ${response.statusText}`,
        };
      }

      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.error || `HTTP error! status: ${response.status}`,
        };
      }

      return {
        success: data.success,
        data: data.data,
        error: data.error,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.unknown,
      };
    }
  }

  async login(loginData: LoginDto): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>(API_ENDPOINTS.auth.login, {
      method: 'POST',
      body: JSON.stringify(loginData),
    });

    if (response.success && response.data) {
      this.setAccessToken(response.data.tokens.accessToken);
      this.setRefreshToken(response.data.tokens.refreshToken);
    }

    return response;
  }

  async register(registerData: RegisterDto): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>(API_ENDPOINTS.auth.register, {
      method: 'POST',
      body: JSON.stringify(registerData),
    });

    if (response.success && response.data) {
      this.setAccessToken(response.data.tokens.accessToken);
      this.setRefreshToken(response.data.tokens.refreshToken);
    }

    return response;
  }

  async refreshToken(): Promise<ApiResponse<TokenPair>> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return {
        success: false,
        error: 'No refresh token available',
      };
    }

    const response = await this.request<TokenPair>(API_ENDPOINTS.auth.refresh, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    if (response.success && response.data) {
      this.setAccessToken(response.data.accessToken);
      this.setRefreshToken(response.data.refreshToken);
    }

    return response;
  }

  async logout(): Promise<ApiResponse<void>> {
    const response = await this.request<void>(API_ENDPOINTS.auth.logout, {
      method: 'POST',
    });

    this.clearTokens();
    return response;
  }

  async forgotPassword(data: ForgotPasswordDto): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(API_ENDPOINTS.auth.forgotPassword, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data: ResetPasswordDto): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(API_ENDPOINTS.auth.resetPassword, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>(API_ENDPOINTS.users);
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`${API_ENDPOINTS.users}/${id}`);
  }

  async createUser(userData: Record<string, unknown>): Promise<ApiResponse<User>> {
    return this.request<User>(API_ENDPOINTS.users, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<ApiResponse<User>> {
    return this.request<User>(`${API_ENDPOINTS.users}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`${API_ENDPOINTS.users}/${id}`, {
      method: 'DELETE',
    });
  }

  async getWishes(): Promise<ApiResponse<Wish[]>> {
    return this.request<Wish[]>(API_ENDPOINTS.wishes);
  }

  async getWish(id: string): Promise<ApiResponse<Wish>> {
    return this.request<Wish>(`${API_ENDPOINTS.wishes}/${id}`);
  }

  async createWish(wishData: CreateWishDto, ownerId?: string): Promise<ApiResponse<Wish>> {
    const url = ownerId ? `${API_ENDPOINTS.wishes}?ownerId=${ownerId}` : API_ENDPOINTS.wishes;
    return this.request<Wish>(url, {
      method: 'POST',
      body: JSON.stringify(wishData),
    });
  }

  async updateWish(id: string, wishData: UpdateWishDto): Promise<ApiResponse<Wish>> {
    return this.request<Wish>(`${API_ENDPOINTS.wishes}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(wishData),
    });
  }

  async deleteWish(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`${API_ENDPOINTS.wishes}/${id}`, {
      method: 'DELETE',
    });
  }

  async getWishlists(): Promise<ApiResponse<Wishlist[]>> {
    return this.request<Wishlist[]>(API_ENDPOINTS.wishlists);
  }

  async getWishlist(id: string): Promise<ApiResponse<Wishlist>> {
    return this.request<Wishlist>(`${API_ENDPOINTS.wishlists}/${id}`);
  }

  async createWishlist(
    wishlistData: CreateWishlistDto,
    ownerId?: string
  ): Promise<ApiResponse<Wishlist>> {
    const url = ownerId ? `${API_ENDPOINTS.wishlists}?ownerId=${ownerId}` : API_ENDPOINTS.wishlists;
    return this.request<Wishlist>(url, {
      method: 'POST',
      body: JSON.stringify(wishlistData),
    });
  }

  async updateWishlist(
    id: string,
    wishlistData: UpdateWishlistDto
  ): Promise<ApiResponse<Wishlist>> {
    return this.request<Wishlist>(`${API_ENDPOINTS.wishlists}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(wishlistData),
    });
  }

  async deleteWishlist(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`${API_ENDPOINTS.wishlists}/${id}`, {
      method: 'DELETE',
    });
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.accessToken, token);
    }
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.refreshToken, token);
    }
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.refreshToken);
    }
    return null;
  }

  clearTokens(): void {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.accessToken);
      localStorage.removeItem(STORAGE_KEYS.refreshToken);
    }
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }
}

export const apiClient = new ApiClient(env.API_URL);
