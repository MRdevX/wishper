import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { FormField } from '../common/form-field';
import { AlertMessage } from '../common/alert-message';
import { User, Save, Edit, X } from 'lucide-react';
import type { IUpdateUserDto } from '@repo/schemas';

interface ProfileFormProps {
  initialData: IUpdateUserDto;
  onSubmit: (data: IUpdateUserDto) => Promise<{ success: boolean; error?: string }>;
  loading?: boolean;
}

export function ProfileForm({ initialData, onSubmit, loading = false }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<IUpdateUserDto>(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await onSubmit(formData);

      if (response.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setError(response.error || 'Failed to update profile');
      }
    } catch {
      setError('An error occurred while updating your profile');
    }
  };

  const handleInputChange =
    (field: keyof IUpdateUserDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <Card className='border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md'>
      <CardHeader className='pb-6'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex-1 space-y-2'>
            <CardTitle className='flex items-center gap-3 text-slate-900'>
              <div className='rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-2.5 shadow-md'>
                <User className='h-6 w-6 text-white' />
              </div>
              <span className='text-xl font-bold'>Account Information</span>
            </CardTitle>
            <CardDescription className='text-base text-slate-600'>
              Update your personal information and account details.
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant='default'
              size='lg'
              className='whitespace-nowrap bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
            >
              <Edit className='mr-2 h-5 w-5' />
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <FormField
              id='name'
              label='Full Name'
              type='text'
              placeholder='Enter your full name'
              value={formData.name || ''}
              onChange={handleInputChange('name')}
              disabled={!isEditing || loading}
              required
            />

            <FormField
              id='email'
              label='Email Address'
              type='email'
              placeholder='Enter your email address'
              value={formData.email || ''}
              onChange={handleInputChange('email')}
              disabled={!isEditing || loading}
              required
            />
          </div>

          {error && <AlertMessage type='error' message={error} />}
          {success && <AlertMessage type='success' message={success} />}

          {isEditing && (
            <div className='flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-end'>
              <Button
                type='button'
                variant='outline'
                onClick={handleCancel}
                size='lg'
                className='border-slate-300 bg-white px-8 py-2.5 font-semibold transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 md:order-1'
              >
                <X className='mr-2 h-5 w-5' />
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={loading}
                size='lg'
                className='bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-2.5 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl md:order-2'
              >
                {loading ? (
                  <div className='flex items-center gap-2'>
                    <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className='mr-2 h-5 w-5' />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
