import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { AlertMessage } from './alert-message';
import { Bell } from 'lucide-react';

interface NotificationSettingsProps {
  initialSettings?: {
    emailNotifications: boolean;
    wishlistUpdates: boolean;
    newWishes: boolean;
  };
  onSave: (settings: {
    emailNotifications: boolean;
    wishlistUpdates: boolean;
    newWishes: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  loading?: boolean;
  className?: string;
}

export function NotificationSettings({
  initialSettings = {
    emailNotifications: true,
    wishlistUpdates: true,
    newWishes: true,
  },
  onSave,
  loading = false,
  className = '',
}: NotificationSettingsProps) {
  const [notificationSettings, setNotificationSettings] = useState(initialSettings);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    try {
      const response = await onSave(notificationSettings);

      if (response.success) {
        setSuccess('Notification settings updated successfully!');
      } else {
        setError(response.error || 'Failed to update notification settings');
      }
    } catch {
      setError('An error occurred while updating notification settings');
    }
  };

  const handleSettingChange =
    (setting: keyof typeof notificationSettings) => (checked: boolean) => {
      setNotificationSettings(prev => ({
        ...prev,
        [setting]: checked,
      }));
    };

  return (
    <Card
      className={`border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
    >
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-slate-900'>
          <div className='rounded-lg bg-blue-100 p-2'>
            <Bell className='h-5 w-5 text-blue-600' />
          </div>
          Notification Settings
        </CardTitle>
        <CardDescription>Choose how you want to be notified about updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100'>
            <div>
              <h4 className='font-semibold text-slate-900'>Email Notifications</h4>
              <p className='text-sm text-slate-600'>Receive notifications via email</p>
            </div>
            <input
              type='checkbox'
              checked={notificationSettings.emailNotifications}
              onChange={e => handleSettingChange('emailNotifications')(e.target.checked)}
              className='h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100'>
            <div>
              <h4 className='font-semibold text-slate-900'>Wishlist Updates</h4>
              <p className='text-sm text-slate-600'>Notify when wishlists are updated</p>
            </div>
            <input
              type='checkbox'
              checked={notificationSettings.wishlistUpdates}
              onChange={e => handleSettingChange('wishlistUpdates')(e.target.checked)}
              className='h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100'>
            <div>
              <h4 className='font-semibold text-slate-900'>New Wishes</h4>
              <p className='text-sm text-slate-600'>Notify when new wishes are added</p>
            </div>
            <input
              type='checkbox'
              checked={notificationSettings.newWishes}
              onChange={e => handleSettingChange('newWishes')(e.target.checked)}
              className='h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {error && <AlertMessage type='error' message={error} />}
          {success && <AlertMessage type='success' message={success} />}

          <Button
            onClick={handleSave}
            disabled={loading}
            className='w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
