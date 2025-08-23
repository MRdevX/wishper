'use client';

import { useState, useEffect } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { X } from 'lucide-react';

interface IWishFormData {
  title: string;
  note?: string;
  status: 'ACTIVE' | 'ACHIEVED' | 'ARCHIVED';
  details: {
    price?: number;
    url?: string;
    imageUrl?: string;
    priority?: 'low' | 'medium' | 'high';
  };
}

interface IWishFormProps {
  onSubmit: (data: IWishFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  initialData?: Partial<IWishFormData>;
  mode?: 'create' | 'edit';
}

export function WishForm({
  onSubmit,
  onCancel,
  loading = false,
  initialData,
  mode = 'create',
}: IWishFormProps) {
  const [formData, setFormData] = useState<IWishFormData>({
    title: '',
    note: '',
    status: 'ACTIVE',
    details: {
      price: undefined,
      url: '',
      imageUrl: '',
      priority: 'medium',
    },
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

  const handleChange = (field: keyof IWishFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDetailChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <Card className='max-h-[90vh] w-full max-w-2xl overflow-y-auto border-0 bg-white shadow-xl'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 border-b border-gray-200 pb-4'>
          <div>
            <CardTitle className='text-xl font-semibold text-gray-900'>
              {mode === 'create' ? 'Add New Wish' : 'Edit Wish'}
            </CardTitle>
            <CardDescription className='text-gray-600'>
              {mode === 'create' ? 'Create a new wish item' : 'Update wish details'}
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
              <label className='mb-2 block text-sm font-medium text-gray-700'>Title *</label>
              <Input
                type='text'
                value={formData.title}
                onChange={e => handleChange('title', e.target.value)}
                required
                className='w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                placeholder='Wish title'
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>Note</label>
              <textarea
                value={formData.note || ''}
                onChange={e => handleChange('note', e.target.value)}
                className='w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                rows={3}
                placeholder='Additional notes about this wish'
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>Status</label>
              <select
                value={formData.status}
                onChange={e => handleChange('status', e.target.value)}
                className='w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              >
                <option value='ACTIVE'>Active</option>
                <option value='ACHIEVED'>Achieved</option>
                <option value='ARCHIVED'>Archived</option>
              </select>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>Price</label>
                <Input
                  type='number'
                  step='0.01'
                  value={formData.details.price || ''}
                  onChange={e =>
                    handleDetailChange(
                      'price',
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                  className='w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='0.00'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>Priority</label>
                <select
                  value={formData.details.priority || 'medium'}
                  onChange={e => handleDetailChange('priority', e.target.value)}
                  className='w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                >
                  <option value='low'>Low</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                </select>
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>Product URL</label>
              <Input
                type='url'
                value={formData.details.url || ''}
                onChange={e => handleDetailChange('url', e.target.value)}
                className='w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                placeholder='https://example.com/product'
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>Image URL</label>
              <Input
                type='url'
                value={formData.details.imageUrl || ''}
                onChange={e => handleDetailChange('imageUrl', e.target.value)}
                className='w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                placeholder='https://example.com/image.jpg'
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
                    ? 'Create Wish'
                    : 'Update Wish'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
