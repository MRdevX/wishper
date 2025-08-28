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

      <div className='space-y-2'>
        <Label htmlFor='wishlistId'>Wishlist (Optional)</Label>
        <Input
          id='wishlistId'
          type='text'
          value={formData.wishlistId || ''}
          onChange={e => handleChange('wishlistId', e.target.value)}
          placeholder='Enter wishlist ID (optional)'
        />
      </div>
    </FormWrapper>
  );
}
