import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { AlertMessage } from './alert-message';
import { Shield, Eye, EyeOff } from 'lucide-react';

interface PasswordFormProps {
  onSubmit: (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<{ success: boolean; error?: string }>;
  loading?: boolean;
  className?: string;
}

export function PasswordForm({ onSubmit, loading = false, className = '' }: PasswordFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    try {
      const response = await onSubmit(passwordData);

      if (response.success) {
        setSuccess('Password updated successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setError(response.error || 'Failed to update password');
      }
    } catch {
      setError('An error occurred while updating your password');
    }
  };

  const handleInputChange =
    (field: keyof typeof passwordData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordData(prev => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <Card
      className={`border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
    >
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
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='currentPassword' className='text-sm font-semibold text-slate-700'>
              Current Password
            </label>
            <div className='relative'>
              <Input
                id='currentPassword'
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={handleInputChange('currentPassword')}
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
                onChange={handleInputChange('newPassword')}
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
                onChange={handleInputChange('confirmPassword')}
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

          {error && <AlertMessage type='error' message={error} />}
          {success && <AlertMessage type='success' message={success} />}

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
  );
}
