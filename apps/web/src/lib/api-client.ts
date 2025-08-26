import { API_ENDPOINTS, STORAGE_KEYS, ERROR_MESSAGES } from '@/lib';
import { env } from './env';
import type {
  IApiResponse,
  IAuthResponse,
  ITokenPair,
  ILoginDto,
  IRegisterDto,
  IForgotPasswordDto,
  IResetPasswordDto,
  IUpdateUserDto,
  ICreateWishDto,
  IUpdateWishDto,
  ICreateWishlistDto,
  IUpdateWishlistDto,
  IUser,
  IWish,
  IWishlist,
} from '@repo/schemas';

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

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<IApiResponse<T>> {
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

  async login(loginData: ILoginDto): Promise<IApiResponse<IAuthResponse>> {
    const response = await this.request<IAuthResponse>(API_ENDPOINTS.auth.login, {
      method: 'POST',
      body: JSON.stringify(loginData),
    });

    if (response.success && response.data) {
      this.setAccessToken(response.data.tokens.accessToken);
      this.setRefreshToken(response.data.tokens.refreshToken);
    }

    return response;
  }

  async register(registerData: IRegisterDto): Promise<IApiResponse<IAuthResponse>> {
    const response = await this.request<IAuthResponse>(API_ENDPOINTS.auth.register, {
      method: 'POST',
      body: JSON.stringify(registerData),
    });

    if (response.success && response.data) {
      this.setAccessToken(response.data.tokens.accessToken);
      this.setRefreshToken(response.data.tokens.refreshToken);
    }

    return response;
  }

  async refreshToken(): Promise<IApiResponse<ITokenPair>> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return {
        success: false,
        error: 'No refresh token available',
      };
    }

    const response = await this.request<ITokenPair>(API_ENDPOINTS.auth.refresh, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    if (response.success && response.data) {
      this.setAccessToken(response.data.accessToken);
      this.setRefreshToken(response.data.refreshToken);
    }

    return response;
  }

  async logout(): Promise<IApiResponse<void>> {
    const response = await this.request<void>(API_ENDPOINTS.auth.logout, {
      method: 'POST',
    });

    this.clearTokens();
    return response;
  }

  async forgotPassword(data: IForgotPasswordDto): Promise<IApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(API_ENDPOINTS.auth.forgotPassword, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data: IResetPasswordDto): Promise<IApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(API_ENDPOINTS.auth.resetPassword, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUsers(): Promise<IApiResponse<IUser[]>> {
    return this.request<IUser[]>(API_ENDPOINTS.users);
  }

  async getUser(id: string): Promise<IApiResponse<IUser>> {
    return this.request<IUser>(`${API_ENDPOINTS.users}/${id}`);
  }

  async createUser(userData: Record<string, unknown>): Promise<IApiResponse<IUser>> {
    return this.request<IUser>(API_ENDPOINTS.users, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: IUpdateUserDto): Promise<IApiResponse<IUser>> {
    return this.request<IUser>(`${API_ENDPOINTS.users}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string): Promise<IApiResponse<void>> {
    return this.request<void>(`${API_ENDPOINTS.users}/${id}`, {
      method: 'DELETE',
    });
  }

  async getWishes(): Promise<IApiResponse<IWish[]>> {
    return this.request<IWish[]>(API_ENDPOINTS.wishes);
  }

  async getWish(id: string): Promise<IApiResponse<IWish>> {
    return this.request<IWish>(`${API_ENDPOINTS.wishes}/${id}`);
  }

  async createWish(wishData: ICreateWishDto, ownerId?: string): Promise<IApiResponse<IWish>> {
    const url = ownerId ? `${API_ENDPOINTS.wishes}?ownerId=${ownerId}` : API_ENDPOINTS.wishes;
    return this.request<IWish>(url, {
      method: 'POST',
      body: JSON.stringify(wishData),
    });
  }

  async updateWish(id: string, wishData: IUpdateWishDto): Promise<IApiResponse<IWish>> {
    return this.request<IWish>(`${API_ENDPOINTS.wishes}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(wishData),
    });
  }

  async deleteWish(id: string): Promise<IApiResponse<void>> {
    return this.request<void>(`${API_ENDPOINTS.wishes}/${id}`, {
      method: 'DELETE',
    });
  }

  async getWishlists(): Promise<IApiResponse<IWishlist[]>> {
    return this.request<IWishlist[]>(API_ENDPOINTS.wishlists);
  }

  async getWishlist(id: string): Promise<IApiResponse<IWishlist>> {
    return this.request<IWishlist>(`${API_ENDPOINTS.wishlists}/${id}`);
  }

  async createWishlist(
    wishlistData: ICreateWishlistDto,
    ownerId?: string
  ): Promise<IApiResponse<IWishlist>> {
    const url = ownerId ? `${API_ENDPOINTS.wishlists}?ownerId=${ownerId}` : API_ENDPOINTS.wishlists;
    return this.request<IWishlist>(url, {
      method: 'POST',
      body: JSON.stringify(wishlistData),
    });
  }

  async updateWishlist(
    id: string,
    wishlistData: IUpdateWishlistDto
  ): Promise<IApiResponse<IWishlist>> {
    return this.request<IWishlist>(`${API_ENDPOINTS.wishlists}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(wishlistData),
    });
  }

  async deleteWishlist(id: string): Promise<IApiResponse<void>> {
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
