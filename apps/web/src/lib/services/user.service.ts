import { apiClient } from '../api-client';
import type { IUser, IUpdateUserDto } from '@repo/schemas';

export class UserService {
  static async getAll(): Promise<IUser[]> {
    try {
      const response = await apiClient.getUsers();
      return response.success ? (response.data as IUser[]) || [] : [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<IUser | null> {
    try {
      const response = await apiClient.getUser(id);
      return response.success ? (response.data as IUser) || null : null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  static async create(
    data: Record<string, unknown>
  ): Promise<{ success: boolean; data?: IUser; error?: string }> {
    try {
      const response = await apiClient.createUser(data);
      return response;
    } catch (error) {
      return { success: false, error: 'Failed to create user' };
    }
  }

  static async update(
    id: string,
    data: IUpdateUserDto
  ): Promise<{ success: boolean; data?: IUser; error?: string }> {
    try {
      const response = await apiClient.updateUser(id, data);
      return response;
    } catch (error) {
      return { success: false, error: 'Failed to update user' };
    }
  }

  static async delete(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.deleteUser(id);
      return response;
    } catch (error) {
      return { success: false, error: 'Failed to delete user' };
    }
  }
}
