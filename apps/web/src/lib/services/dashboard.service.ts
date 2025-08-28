import { apiClient } from '../api-client';
import type { IWish, IWishlist } from '@repo/schemas';

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
