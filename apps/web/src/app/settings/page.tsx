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
import { Settings, Bell, Shield, Palette, Eye, EyeOff, User, Calendar } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

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
          <Card className='border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-slate-900'>
                <div className='rounded-lg bg-red-100 p-2'>
                  <Shield className='h-5 w-5 text-red-600' />
                </div>
                Change Password
              </CardTitle>
              <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className='space-y-4'>
                <div className='space-y-2'>
                  <label htmlFor='currentPassword' className='text-sm font-semibold text-slate-700'>
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
                      className='border-slate-300 focus:border-red-500 focus:ring-red-500'
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-slate-100'
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className='h-4 w-4 text-slate-500' />
                      ) : (
                        <Eye className='h-4 w-4 text-slate-500' />
                      )}
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='newPassword' className='text-sm font-semibold text-slate-700'>
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
                      className='border-slate-300 focus:border-red-500 focus:ring-red-500'
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-slate-100'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className='h-4 w-4 text-slate-500' />
                      ) : (
                        <Eye className='h-4 w-4 text-slate-500' />
                      )}
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='confirmPassword' className='text-sm font-semibold text-slate-700'>
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
                      className='border-slate-300 focus:border-red-500 focus:ring-red-500'
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-slate-100'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-4 w-4 text-slate-500' />
                      ) : (
                        <Eye className='h-4 w-4 text-slate-500' />
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className='rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700'>
                    {error}
                  </div>
                )}

                {success && (
                  <div className='rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-700'>
                    {success}
                  </div>
                )}

                <Button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transition-all duration-200 hover:from-red-700 hover:to-red-800 hover:shadow-xl'
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className='border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md'>
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
                    onChange={e =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        emailNotifications: e.target.checked,
                      }))
                    }
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
                    onChange={e =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        wishlistUpdates: e.target.checked,
                      }))
                    }
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
                    onChange={e =>
                      setNotificationSettings(prev => ({
                        ...prev,
                        newWishes: e.target.checked,
                      }))
                    }
                    className='h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <Button
                  onClick={handleNotificationSettingsChange}
                  disabled={loading}
                  className='w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className='border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-slate-900'>
                <div className='rounded-lg bg-purple-100 p-2'>
                  <Palette className='h-5 w-5 text-purple-600' />
                </div>
                Appearance
              </CardTitle>
              <CardDescription>Customize the appearance of your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <label htmlFor='theme' className='text-sm font-semibold text-slate-700'>
                    Theme
                  </label>
                  <select
                    id='theme'
                    className='mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
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
          <Card className='border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-slate-900'>
                <div className='rounded-lg bg-green-100 p-2'>
                  <Settings className='h-5 w-5 text-green-600' />
                </div>
                Account Information
              </CardTitle>
              <CardDescription>View your account details and statistics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center gap-3 rounded-lg bg-slate-50 p-3'>
                  <User className='h-5 w-5 text-slate-500' />
                  <div>
                    <label className='text-sm font-semibold text-slate-600'>Email</label>
                    <p className='font-medium text-slate-900'>{user?.email}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 rounded-lg bg-slate-50 p-3'>
                  <User className='h-5 w-5 text-slate-500' />
                  <div>
                    <label className='text-sm font-semibold text-slate-600'>Name</label>
                    <p className='font-medium text-slate-900'>{user?.name || 'Not set'}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 rounded-lg bg-slate-50 p-3'>
                  <Calendar className='h-5 w-5 text-slate-500' />
                  <div>
                    <label className='text-sm font-semibold text-slate-600'>Member Since</label>
                    <p className='font-medium text-slate-900'>
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
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
