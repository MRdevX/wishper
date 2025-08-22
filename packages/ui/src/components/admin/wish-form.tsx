'use client';

import { useState, useEffect } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../card';
import { X } from 'lucide-react';

interface WishFormData {
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

interface WishFormProps {
  onSubmit: (data: WishFormData) => void;
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
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof WishFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white shadow-xl border-0 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-200">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              {mode === 'create' ? 'Add New Wish' : 'Edit Wish'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {mode === 'create'
                ? 'Create a new wish item'
                : 'Update wish details'}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Wish title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note
              </label>
              <textarea
                value={formData.note || ''}
                onChange={(e) => handleChange('note', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                rows={3}
                placeholder="Additional notes about this wish"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="ACTIVE">Active</option>
                <option value="ACHIEVED">Achieved</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.details.price || ''}
                  onChange={(e) =>
                    handleDetailChange(
                      'price',
                      e.target.value ? parseFloat(e.target.value) : undefined,
                    )
                  }
                  className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.details.priority || 'medium'}
                  onChange={(e) =>
                    handleDetailChange('priority', e.target.value)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product URL
              </label>
              <Input
                type="url"
                value={formData.details.url || ''}
                onChange={(e) => handleDetailChange('url', e.target.value)}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://example.com/product"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <Input
                type="url"
                value={formData.details.imageUrl || ''}
                onChange={(e) => handleDetailChange('imageUrl', e.target.value)}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
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
