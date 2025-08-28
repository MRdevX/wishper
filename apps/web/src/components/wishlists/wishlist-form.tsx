'use client';

import { useState, useEffect } from 'react';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { FormWrapper } from '@/components/common';
import type { ICreateWishlistDto, IUpdateWishlistDto } from '@repo/schemas';

interface WishlistFormData {
  name: string;
}

interface WishlistFormProps {
  onSubmit: (data: ICreateWishlistDto | IUpdateWishlistDto) => Promise<void>;
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
    <FormWrapper
      title={mode === 'create' ? 'Create New Wishlist' : 'Edit Wishlist'}
      description={
        mode === 'create'
          ? 'Add a new wishlist to organize your wishes'
          : 'Update your wishlist details'
      }
      onSubmit={handleSubmit}
      onCancel={onCancel}
      loading={loading}
      mode={mode}
    >
      <div className='space-y-2'>
        <Label htmlFor='name'>Name *</Label>
        <Input
          id='name'
          type='text'
          value={formData.name}
          onChange={e => handleChange('name', e.target.value)}
          required
          placeholder='Enter wishlist name'
        />
      </div>
    </FormWrapper>
  );
}
