'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { StatusBadge } from '../common/status-badge';
import { formatDate } from '@/lib/utils';
import type { IWish } from '@repo/schemas';

interface IWishDetailsProps {
  data: IWish;
}

export function WishDetails({ data: wish }: IWishDetailsProps) {
  return (
    <div className='space-y-6'>
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>{wish.title}</span>
            <StatusBadge status={wish.status} />
          </CardTitle>
          {wish.note && <CardDescription>{wish.note}</CardDescription>}
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <h4 className='text-sm font-medium text-gray-500'>Created</h4>
              <p className='text-sm text-gray-900'>{formatDate(wish.createdAt)}</p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-gray-500'>Last Updated</h4>
              <p className='text-sm text-gray-900'>{formatDate(wish.updatedAt)}</p>
            </div>
          </div>

          {wish.wishlist && (
            <div>
              <h4 className='text-sm font-medium text-gray-500'>Wishlist</h4>
              <p className='text-sm text-gray-900'>{wish.wishlist.name}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
