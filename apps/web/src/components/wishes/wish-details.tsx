'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Badge } from '@repo/ui/components/badge';
import { StatusBadge } from '../common/status-badge';
import { formatCurrency, formatDate } from '@/lib/formatters';
import type { IWish } from '@repo/schemas';

interface IWishDetailsProps {
  data: IWish;
}

export function WishDetails({ data: wish }: IWishDetailsProps) {
  const details = wish.details as any;

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200',
  };

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

      {/* Details */}
      {(details?.price || details?.priority || details?.description) && (
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {details?.price && (
              <div>
                <h4 className='text-sm font-medium text-gray-500'>Price</h4>
                <p className='text-lg font-semibold text-green-600'>
                  {formatCurrency(details.price)}
                </p>
              </div>
            )}

            {details?.priority && (
              <div>
                <h4 className='text-sm font-medium text-gray-500'>Priority</h4>
                <Badge
                  className={
                    priorityColors[details.priority] || 'border-gray-200 bg-gray-100 text-gray-800'
                  }
                >
                  {details.priority.charAt(0).toUpperCase() + details.priority.slice(1)}
                </Badge>
              </div>
            )}

            {details?.description && (
              <div>
                <h4 className='text-sm font-medium text-gray-500'>Description</h4>
                <p className='whitespace-pre-wrap text-sm text-gray-900'>{details.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Links */}
      {details?.url && (
        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className='text-sm font-medium text-gray-500'>Product URL</h4>
              <a
                href={details.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:text-blue-800 hover:underline'
              >
                {details.url}
              </a>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
