'use client';

import { useState, useEffect } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { X } from 'lucide-react';

interface WishlistFormData {
  name: string;
}

interface WishlistFormProps {
  onSubmit: (data: WishlistFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  initialData?: Partial<WishlistFormData>;
  mode?: 'create' | 'edit';
}

export function WishlistForm({
  onSubmit,
  onCancel,
  loading = false,
  initialData,
  mode = 'create',
}: WishlistFormProps) {
  const [formData, setFormData] = useState<WishlistFormData>({
    name: '',
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof WishlistFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <Card className='w-full max-w-md border-0 bg-white shadow-xl'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b border-gray-200 pb-4'>
          <div>
            <CardTitle className='text-xl font-semibold text-gray-900'>
              {mode === 'create' ? 'Add New Wishlist' : 'Edit Wishlist'}
            </CardTitle>
            <CardDescription className='text-gray-600'>
              {mode === 'create' ? 'Create a new wishlist' : 'Update wishlist details'}
            </CardDescription>
          </div>
          <Button
            variant='ghost'
            size='sm'
            onClick={onCancel}
            className='h-8 w-8 p-0 hover:bg-gray-100'
          >
            <X className='h-4 w-4' />
          </Button>
        </CardHeader>
        <CardContent className='pt-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>Name *</label>
              <Input
                type='text'
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                required
                className='w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                placeholder='Wishlist name'
              />
            </div>

            <div className='flex space-x-3 border-t border-gray-200 pt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={onCancel}
                className='flex-1 border-gray-300 text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={loading}
                className='flex-1 bg-blue-600 text-white hover:bg-blue-700'
              >
                {loading
                  ? mode === 'create'
                    ? 'Creating...'
                    : 'Updating...'
                  : mode === 'create'
                    ? 'Create Wishlist'
                    : 'Update Wishlist'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
