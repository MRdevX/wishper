import {
  IApiResponse,
  IUser,
  IWish,
  IWishlist,
  WishStatus,
  IWishDetails,
  ICreateUserDto,
  IUpdateUserDto,
  ICreateWishDto,
  IUpdateWishDto,
  ICreateWishlistDto,
  IUpdateWishlistDto,
} from '@repo/schemas';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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
};

export { WishStatus } from '@repo/schemas';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<IApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
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

      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
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

  async updateUser(id: string, userData: Record<string, unknown>) {
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
