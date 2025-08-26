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
import { WishStatus } from '@repo/schemas';
import type { IWish } from '@repo/schemas';

interface WishDetailsProps {
  wish: IWish;
}

export function WishDetails({ wish }: WishDetailsProps) {
  const details = wish.details as any;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
                <Badge className={getPriorityColor(details.priority)}>
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
      {(details?.url || details?.imageUrl) && (
        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {details?.url && (
              <div>
                <h4 className='text-sm font-medium text-gray-500'>Product URL</h4>
                <a
                  href={details.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='break-all text-sm text-blue-600 underline hover:text-blue-800'
                >
                  {details.url}
                </a>
              </div>
            )}

            {details?.imageUrl && (
              <div>
                <h4 className='text-sm font-medium text-gray-500'>Image</h4>
                <div className='mt-2'>
                  <img
                    src={details.imageUrl}
                    alt={wish.title}
                    className='max-w-xs rounded-lg border border-gray-200'
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Status History */}
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-500'>Current Status</span>
              <StatusBadge status={wish.status} />
            </div>
            {wish.status === WishStatus.ACHIEVED && (
              <p className='mt-2 text-sm text-green-600'>
                🎉 Congratulations! This wish has been achieved.
              </p>
            )}
            {wish.status === WishStatus.ARCHIVED && (
              <p className='mt-2 text-sm text-gray-600'>📦 This wish has been archived.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
