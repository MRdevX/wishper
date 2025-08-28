'use client';

import { ProtectedRoute } from '@/features/auth/protected-route';
import { useAuthContext } from '@/lib/auth-context';
import { useSettings } from '@/hooks/useSettings';
import { SettingsLayout } from '@/components/settings';
import {
  PasswordForm,
  NotificationSettings,
  ThemeSettings,
  AccountInfo,
} from '@/components/common';

function SettingsContent() {
  const { user } = useAuthContext();
  const {
    loading,
    currentTheme,
    notificationSettings,
    changePassword,
    updateNotificationSettings,
    updateTheme,
  } = useSettings();

  if (!user) {
    return null;
  }

  return (
    <SettingsLayout>
      {/* Password Change */}
      <PasswordForm onSubmit={changePassword} loading={loading} />

      {/* Notification Settings */}
      <NotificationSettings
        initialSettings={notificationSettings}
        onSave={updateNotificationSettings}
        loading={loading}
      />

      {/* Theme Settings */}
      <ThemeSettings currentTheme={currentTheme} onThemeChange={updateTheme} />

      {/* Account Information */}
      <AccountInfo user={user} />
    </SettingsLayout>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
