import { apiClient } from '../api-client';
import type { IWish, ICreateWishDto, IUpdateWishDto } from '@repo/schemas';

export class WishService {
  static async getAll(): Promise<IWish[]> {
    try {
      const response = await apiClient.getWishes();
      return response.success ? (response.data as IWish[]) || [] : [];
    } catch (error) {
      console.error('Error fetching wishes:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<IWish | null> {
    try {
      const response = await apiClient.getWish(id);
      return response.success ? (response.data as IWish) || null : null;
    } catch (error) {
      console.error('Error fetching wish:', error);
      return null;
    }
  }

  static async create(
    data: ICreateWishDto,
    ownerId?: string
  ): Promise<{ success: boolean; data?: IWish; error?: string }> {
    try {
      const response = await apiClient.createWish(data, ownerId);
      return response;
    } catch (error) {
      return { success: false, error: 'Failed to create wish' };
    }
  }

  static async update(
    id: string,
    data: IUpdateWishDto
  ): Promise<{ success: boolean; data?: IWish; error?: string }> {
    try {
      const response = await apiClient.updateWish(id, data);
      return response;
    } catch (error) {
      return { success: false, error: 'Failed to update wish' };
    }
  }

  static async delete(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.deleteWish(id);
      return response;
    } catch (error) {
      return { success: false, error: 'Failed to delete wish' };
    }
  }
}
