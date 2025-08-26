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
import { User, Save, Edit } from 'lucide-react';
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
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              Account Information
            </CardTitle>
            <CardDescription>Update your personal information and account details.</CardDescription>
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
          <FormField
            id='name'
            label='Name'
            type='text'
            placeholder='Enter your name'
            value={formData.name || ''}
            onChange={handleInputChange('name')}
            disabled={!isEditing || loading}
            required
          />

          <FormField
            id='email'
            label='Email'
            type='email'
            placeholder='Enter your email'
            value={formData.email || ''}
            onChange={handleInputChange('email')}
            disabled={!isEditing || loading}
            required
          />

          {error && <AlertMessage type='error' message={error} />}
          {success && <AlertMessage type='success' message={success} />}

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
  );
}
