'use client';

import { useState } from 'react';
import { DashboardLayout } from '../../components/layout/dashboard-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Avatar } from '@repo/ui/components/avatar';
import { useAuthContext } from '../../contexts/auth-context';
import { ProtectedRoute } from '../../components/auth/protected-route';
import { apiClient } from '../../lib/api-client';
import type { UpdateUserDto } from '../../types';
import { User, Save, Edit, Mail, Calendar } from 'lucide-react';

function ProfileContent() {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateUserDto>({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await apiClient.updateUser(user?.id || '', formData);

      if (response.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setError(response.error || 'Failed to update profile');
      }
    } catch {
      setError('An error occurred while updating your profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof UpdateUserDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>Profile</h1>
          <p className='mt-2 text-slate-600'>Manage your account information and preferences.</p>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Profile Card */}
          <div className='lg:col-span-1'>
            <Card>
              <CardHeader className='text-center'>
                <div className='mb-4 flex justify-center'>
                  <Avatar className='h-24 w-24'>
                    <div className='flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-2xl font-bold text-white'>
                      {user?.name
                        ? user.name.charAt(0).toUpperCase()
                        : user?.email
                          ? user.email.charAt(0).toUpperCase()
                          : 'U'}
                    </div>
                  </Avatar>
                </div>
                <CardTitle className='text-xl'>{user?.name || 'User'}</CardTitle>
                <CardDescription className='flex items-center justify-center gap-2'>
                  <Mail className='h-4 w-4' />
                  {user?.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-3 text-sm'>
                  <div className='flex items-center gap-2 text-slate-600'>
                    <Calendar className='h-4 w-4' />
                    <span>
                      Member since{' '}
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className='lg:col-span-2'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle className='flex items-center gap-2'>
                      <User className='h-5 w-5' />
                      Account Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and account details.
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} variant='outline' size='sm'>
                      <Edit className='mr-2 h-4 w-4' />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='space-y-2'>
                    <label htmlFor='name' className='text-sm font-medium'>
                      Name
                    </label>
                    <Input
                      id='name'
                      type='text'
                      placeholder='Enter your name'
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      disabled={!isEditing || loading}
                    />
                  </div>

                  <div className='space-y-2'>
                    <label htmlFor='email' className='text-sm font-medium'>
                      Email
                    </label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='Enter your email'
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      disabled={!isEditing || loading}
                    />
                  </div>

                  {error && (
                    <div className='rounded-md bg-red-50 p-3 text-sm text-red-600'>{error}</div>
                  )}

                  {success && (
                    <div className='rounded-md bg-green-50 p-3 text-sm text-green-600'>
                      {success}
                    </div>
                  )}

                  {isEditing && (
                    <div className='flex gap-3 pt-4'>
                      <Button type='submit' disabled={loading}>
                        {loading ? (
                          'Saving...'
                        ) : (
                          <>
                            <Save className='mr-2 h-4 w-4' />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button type='button' variant='outline' onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className='mt-6'>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between rounded-lg border border-slate-200 p-4'>
                    <div>
                      <h4 className='font-medium'>Password</h4>
                      <p className='text-sm text-slate-600'>
                        Update your password to keep your account secure.
                      </p>
                    </div>
                    <Button variant='outline' size='sm'>
                      Change Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
