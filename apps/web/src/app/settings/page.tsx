'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { useAuthContext } from '@/lib/auth-context';
import { ProtectedRoute } from '@/features/auth/protected-route';
import { Settings, Bell, Shield, Palette, Eye, EyeOff } from 'lucide-react';

function SettingsContent() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    wishlistUpdates: true,
    newWishes: true,
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch {
      setError('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationSettingsChange = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Notification settings updated successfully!');
    } catch {
      setError('Failed to update notification settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>Settings</h1>
          <p className='mt-2 text-slate-600'>Manage your account settings and preferences.</p>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5' />
                Change Password
              </CardTitle>
              <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className='space-y-4'>
                <div className='space-y-2'>
                  <label htmlFor='currentPassword' className='text-sm font-medium'>
                    Current Password
                  </label>
                  <div className='relative'>
                    <Input
                      id='currentPassword'
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={e =>
                        setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))
                      }
                      required
                      disabled={loading}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='newPassword' className='text-sm font-medium'>
                    New Password
                  </label>
                  <div className='relative'>
                    <Input
                      id='newPassword'
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={e =>
                        setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))
                      }
                      required
                      minLength={6}
                      disabled={loading}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='confirmPassword' className='text-sm font-medium'>
                    Confirm New Password
                  </label>
                  <div className='relative'>
                    <Input
                      id='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={e =>
                        setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))
                      }
                      required
                      disabled={loading}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className='rounded-md bg-red-50 p-3 text-sm text-red-600'>{error}</div>
                )}

                {success && (
                  <div className='rounded-md bg-green-50 p-3 text-sm text-green-600'>{success}</div>
                )}

                <Button type='submit' disabled={loading}>
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Bell className='h-5 w-5' />
                Notification Settings
              </CardTitle>
              <CardDescription>Choose how you want to be notified about updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='font-medium'>Email Notifications</h4>
                    <p className='text-sm text-slate-600'>Receive notifications via email</p>
                  </div>
                  <input
                    type='checkbox'
                    checked={notificationSettings.emailNotifications}
                    onChange={e =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        emailNotifications: e.target.checked,
                      }))
                    }
                    className='h-4 w-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500'
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='font-medium'>Wishlist Updates</h4>
                    <p className='text-sm text-slate-600'>Notify when wishlists are updated</p>
                  </div>
                  <input
                    type='checkbox'
                    checked={notificationSettings.wishlistUpdates}
                    onChange={e =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        wishlistUpdates: e.target.checked,
                      }))
                    }
                    className='h-4 w-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500'
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='font-medium'>New Wishes</h4>
                    <p className='text-sm text-slate-600'>Notify when new wishes are added</p>
                  </div>
                  <input
                    type='checkbox'
                    checked={notificationSettings.newWishes}
                    onChange={e =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        newWishes: e.target.checked,
                      }))
                    }
                    className='h-4 w-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500'
                  />
                </div>

                <Button
                  onClick={handleNotificationSettingsChange}
                  disabled={loading}
                  className='w-full'
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Palette className='h-5 w-5' />
                Appearance
              </CardTitle>
              <CardDescription>Customize the appearance of your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <label htmlFor='theme' className='text-sm font-medium'>
                    Theme
                  </label>
                  <select
                    id='theme'
                    className='mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500'
                    defaultValue='system'
                  >
                    <option value='light'>Light</option>
                    <option value='dark'>Dark</option>
                    <option value='system'>System</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Settings className='h-5 w-5' />
                Account Information
              </CardTitle>
              <CardDescription>View your account details and statistics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-slate-600'>Email</label>
                  <p className='text-slate-900'>{user?.email}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-slate-600'>Name</label>
                  <p className='text-slate-900'>{user?.name || 'Not set'}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-slate-600'>Member Since</label>
                  <p className='text-slate-900'>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
