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
                placeholder='Enter wish title'
                className='w-full'
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>Note</label>
              <textarea
                value={formData.note || ''}
                onChange={e => handleChange('note', e.target.value)}
                placeholder='Additional notes about this wish'
                rows={3}
                className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>Status</label>
              <select
                value={formData.status}
                onChange={e => handleChange('status', e.target.value)}
                className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
              >
                <option value='ACTIVE'>Active</option>
                <option value='ACHIEVED'>Achieved</option>
                <option value='ARCHIVED'>Archived</option>
              </select>
            </div>

            <div className='flex justify-end space-x-3 pt-6'>
              <Button type='button' variant='outline' onClick={onCancel} disabled={loading}>
                Cancel
              </Button>
              <Button type='submit' disabled={loading}>
                {loading ? 'Saving...' : mode === 'create' ? 'Create Wish' : 'Update Wish'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
