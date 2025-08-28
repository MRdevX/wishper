'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { formatDate } from '@/lib/utils';
import type { IWishlist } from '@repo/schemas';

interface IWishlistDetailsProps {
  data: IWishlist;
}

export function WishlistDetails({ data: wishlist }: IWishlistDetailsProps) {
  return (
    <div className='space-y-6'>
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>{wishlist.name}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <h4 className='text-sm font-medium text-gray-500'>Created</h4>
              <p className='text-sm text-gray-900'>{formatDate(wishlist.createdAt)}</p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-gray-500'>Last Updated</h4>
              <p className='text-sm text-gray-900'>{formatDate(wishlist.updatedAt)}</p>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-500'>Wishes Count</h4>
            <p className='text-sm text-gray-900'>{wishlist.wishes?.length || 0} wishes</p>
          </div>
        </CardContent>
      </Card>

      {/* Wishes List */}
      {wishlist.wishes && wishlist.wishes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Wishes in this list</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              {wishlist.wishes.map(wish => (
                <div
                  key={wish.id}
                  className='flex items-center justify-between rounded-lg border border-gray-200 p-3'
                >
                  <div>
                    <h5 className='font-medium text-gray-900'>{wish.title}</h5>
                    {wish.note && <p className='text-sm text-gray-600'>{wish.note}</p>}
                  </div>
                  <span className='text-sm capitalize text-gray-500'>{wish.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
