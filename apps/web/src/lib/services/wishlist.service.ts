import { apiClient } from '../api-client';
import type { IWishlist, ICreateWishlistDto, IUpdateWishlistDto } from '@repo/schemas';

export class WishlistService {
  static async getAll(): Promise<IWishlist[]> {
    try {
      const response = await apiClient.getWishlists();
      return response.success ? (response.data as IWishlist[]) || [] : [];
    } catch (error) {
      console.error('Error fetching wishlists:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<IWishlist | null> {
    try {
      const response = await apiClient.getWishlist(id);
      return response.success ? (response.data as IWishlist) || null : null;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return null;
    }
  }

  static async create(
    data: ICreateWishlistDto,
    ownerId?: string
  ): Promise<{ success: boolean; data?: IWishlist; error?: string }> {
    try {
      const response = await apiClient.createWishlist(data, ownerId);
      return response;
    } catch (error) {
      return { success: false, error: 'Failed to create wishlist' };
    }
  }

  static async update(
    id: string,
    data: IUpdateWishlistDto
  ): Promise<{ success: boolean; data?: IWishlist; error?: string }> {
    try {
      const response = await apiClient.updateWishlist(id, data);
      return response;
    } catch (error) {
      return { success: false, error: 'Failed to update wishlist' };
    }
  }

  static async delete(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.deleteWishlist(id);
      return response;
    } catch (error) {
      return { success: false, error: 'Failed to delete wishlist' };
    }
  }
}
