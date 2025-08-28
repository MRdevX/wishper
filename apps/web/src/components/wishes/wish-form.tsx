'use client';

import { useState, useEffect } from 'react';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Textarea } from '@repo/ui/components/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';
import { FormWrapper } from '@/components/common';
import { WishStatus } from '@repo/schemas';
import type { ICreateWishDto, IUpdateWishDto } from '@repo/schemas';

interface WishFormData {
  title: string;
  note?: string;
  status: WishStatus;
  details: {
    price?: number;
    url?: string;
    imageUrl?: string;
    priority?: 'low' | 'medium' | 'high';
    description?: string;
  };
  wishlistId?: string;
}

interface WishFormProps {
  onSubmit: (data: ICreateWishDto | IUpdateWishDto) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  initialData?: Partial<WishFormData>;
  mode?: 'create' | 'edit';
}

export function WishForm({
  onSubmit,
  onCancel,
  loading = false,
  initialData,
  mode = 'create',
}: WishFormProps) {
  const [formData, setFormData] = useState<WishFormData>({
    title: '',
    note: '',
    status: WishStatus.ACTIVE,
    details: {
      price: undefined,
      url: '',
      imageUrl: '',
      priority: 'medium',
      description: '',
    },
    wishlistId: '',
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

  const handleChange = (field: keyof WishFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDetailChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  return (
    <FormWrapper
      title={mode === 'create' ? 'Create New Wish' : 'Edit Wish'}
      description={
        mode === 'create' ? 'Add a new wish to your collection' : 'Update your wish details'
      }
      onSubmit={handleSubmit}
      onCancel={onCancel}
      loading={loading}
      mode={mode}
    >
      <div className='space-y-2'>
        <Label htmlFor='title'>Title *</Label>
        <Input
          id='title'
          type='text'
          value={formData.title}
          onChange={e => handleChange('title', e.target.value)}
          required
          placeholder='Enter wish title'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='note'>Note</Label>
        <Textarea
          id='note'
          value={formData.note || ''}
          onChange={e => handleChange('note', e.target.value)}
          placeholder='Additional notes about this wish'
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='status'>Status</Label>
        <Select value={formData.status} onValueChange={value => handleChange('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder='Select status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={WishStatus.ACTIVE}>Active</SelectItem>
            <SelectItem value={WishStatus.ACHIEVED}>Achieved</SelectItem>
            <SelectItem value={WishStatus.ARCHIVED}>Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='price'>Price</Label>
          <Input
            id='price'
            type='number'
            step='0.01'
            min='0'
            value={formData.details.price || ''}
            onChange={e =>
              handleDetailChange('price', e.target.value ? parseFloat(e.target.value) : undefined)
            }
            placeholder='0.00'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='priority'>Priority</Label>
          <Select
            value={formData.details.priority || 'medium'}
            onValueChange={value => handleDetailChange('priority', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select priority' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='low'>Low</SelectItem>
              <SelectItem value='medium'>Medium</SelectItem>
              <SelectItem value='high'>High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='url'>URL</Label>
        <Input
          id='url'
          type='url'
          value={formData.details.url || ''}
          onChange={e => handleDetailChange('url', e.target.value)}
          placeholder='https://example.com'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='imageUrl'>Image URL</Label>
        <Input
          id='imageUrl'
          type='url'
          value={formData.details.imageUrl || ''}
          onChange={e => handleDetailChange('imageUrl', e.target.value)}
          placeholder='https://example.com/image.jpg'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          value={formData.details.description || ''}
          onChange={e => handleDetailChange('description', e.target.value)}
          placeholder='Detailed description of the wish'
          rows={3}
        />
      </div>
    </FormWrapper>
  );
}
