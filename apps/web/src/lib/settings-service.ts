import { apiClient } from './api-client';

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  wishlistUpdates: boolean;
  newWishes: boolean;
}

export class SettingsService {
  static async changePassword(
    userId: string,
    data: PasswordChangeData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // TODO: Replace with actual API call when backend is ready

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (data.currentPassword === 'wrong') {
        return { success: false, error: 'Current password is incorrect' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update password' };
    }
  }

  static async updateNotificationSettings(
    userId: string,
    settings: NotificationSettings
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // TODO: Replace with actual API call when backend is ready

      await new Promise(resolve => setTimeout(resolve, 1000));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update notification settings' };
    }
  }

  static async updateTheme(
    userId: string,
    theme: 'light' | 'dark' | 'system'
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // TODO: Replace with actual API call when backend is ready

      await new Promise(resolve => setTimeout(resolve, 500));

      localStorage.setItem('theme', theme);

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update theme' };
    }
  }

  static getCurrentTheme(): 'light' | 'dark' | 'system' {
    return (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
  }

  static getDefaultNotificationSettings(): NotificationSettings {
    return {
      emailNotifications: true,
      wishlistUpdates: true,
      newWishes: true,
    };
  }
}
