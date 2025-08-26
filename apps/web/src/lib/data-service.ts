import { apiClient } from '../lib/api-client';
import type { IWish, IWishlist, IUser } from '@repo/schemas';

export class DataService<T> {
  constructor(
    private getFn: () => Promise<any>,
    private createFn: (data: any) => Promise<any>,
    private updateFn: (id: string, data: any) => Promise<any>,
    private deleteFn: (id: string) => Promise<any>
  ) {}

  async getAll() {
    const response = await this.getFn();
    return response.success ? response.data : [];
  }

  async create(data: any) {
    const response = await this.createFn(data);
    return response;
  }

  async update(id: string, data: any) {
    const response = await this.updateFn(id, data);
    return response;
  }

  async delete(id: string) {
    const response = await this.deleteFn(id);
    return response;
  }
}

export const wishService = new DataService<IWish>(
  () => apiClient.getWishes(),
  data => apiClient.createWish(data),
  (id, data) => apiClient.updateWish(id, data),
  id => apiClient.deleteWish(id)
);

export const wishlistService = new DataService<IWishlist>(
  () => apiClient.getWishlists(),
  data => apiClient.createWishlist(data),
  (id, data) => apiClient.updateWishlist(id, data),
  id => apiClient.deleteWishlist(id)
);

export const userService = new DataService<IUser>(
  () => apiClient.getUsers(),
  data => apiClient.createUser(data),
  (id, data) => apiClient.updateUser(id, data),
  id => apiClient.deleteUser(id)
);

export class DashboardService {
  static async getStats() {
    try {
      const [usersResponse, wishesResponse, wishlistsResponse] = await Promise.all([
        apiClient.getUsers(),
        apiClient.getWishes(),
        apiClient.getWishlists(),
      ]);

      const users = usersResponse.success ? (usersResponse.data as any[]) || [] : [];
      const wishes = wishesResponse.success ? (wishesResponse.data as any[]) || [] : [];
      const wishlists = wishlistsResponse.success ? (wishlistsResponse.data as any[]) || [] : [];

      return {
        totalUsers: users.length,
        totalWishes: wishes.length,
        totalWishlists: wishlists.length,
        activeUsers: users.length,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        totalUsers: 0,
        totalWishes: 0,
        totalWishlists: 0,
        activeUsers: 0,
      };
    }
  }

  static async getUserStats() {
    try {
      const [wishlistsResponse, wishesResponse] = await Promise.all([
        apiClient.getWishlists(),
        apiClient.getWishes(),
      ]);

      const wishlists = wishlistsResponse.success
        ? (wishlistsResponse.data as IWishlist[]) || []
        : [];
      const wishes = wishesResponse.success ? (wishesResponse.data as IWish[]) || [] : [];

      const completed = wishes.filter(wish => wish.status === 'ACHIEVED').length;
      const pending = wishes.filter(wish => wish.status === 'ACTIVE').length;

      return {
        totalWishlists: wishlists.length,
        totalWishes: wishes.length,
        completedWishes: completed,
        pendingWishes: pending,
        recentWishlists: wishlists.slice(0, 3),
        recentWishes: wishes.slice(0, 5),
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return {
        totalWishlists: 0,
        totalWishes: 0,
        completedWishes: 0,
        pendingWishes: 0,
        recentWishlists: [],
        recentWishes: [],
      };
    }
  }
}
