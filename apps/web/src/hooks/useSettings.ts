import { useState, useEffect } from 'react';
import { useAuthContext } from '@/lib/auth-context';
import { SettingsService, type NotificationSettings } from '@/lib/settings-service';

export function useSettings() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(
    SettingsService.getDefaultNotificationSettings()
  );

  useEffect(() => {
    setCurrentTheme(SettingsService.getCurrentTheme());
  }, []);

  const changePassword = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (!user?.id) {
      return { success: false, error: 'User not authenticated' };
    }

    setLoading(true);
    try {
      const result = await SettingsService.changePassword(user.id, data);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const updateNotificationSettings = async (settings: NotificationSettings) => {
    if (!user?.id) {
      return { success: false, error: 'User not authenticated' };
    }

    setLoading(true);
    try {
      const result = await SettingsService.updateNotificationSettings(user.id, settings);
      if (result.success) {
        setNotificationSettings(settings);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const updateTheme = async (theme: 'light' | 'dark' | 'system') => {
    if (!user?.id) {
      return { success: false, error: 'User not authenticated' };
    }

    setLoading(true);
    try {
      const result = await SettingsService.updateTheme(user.id, theme);
      if (result.success) {
        setCurrentTheme(theme);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    currentTheme,
    notificationSettings,
    changePassword,
    updateNotificationSettings,
    updateTheme,
  };
}
