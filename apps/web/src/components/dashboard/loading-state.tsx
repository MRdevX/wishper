import { DashboardLayout } from '../layout/dashboard-layout';
import { Loader2, Sparkles } from 'lucide-react';

export function LoadingState() {
  return (
    <DashboardLayout>
      <div className='flex min-h-[400px] flex-col items-center justify-center space-y-6'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-pink-100'>
          <Sparkles className='h-8 w-8 text-pink-600' />
        </div>

        <div className='space-y-2 text-center'>
          <h3 className='text-lg font-semibold text-slate-900'>Loading your dashboard</h3>
          <p className='text-sm text-slate-600'>Gathering your wishlists and wishes...</p>
        </div>

        <div className='flex items-center gap-2 text-slate-600'>
          <Loader2 className='h-4 w-4 animate-spin' />
          <span className='text-sm'>Please wait</span>
        </div>

        {/* Skeleton loader for content */}
        <div className='w-full max-w-4xl space-y-6'>
          {/* Stats skeleton */}
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='h-32 animate-pulse rounded-xl bg-slate-200'></div>
            ))}
          </div>

          {/* Content skeleton */}
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='h-48 animate-pulse rounded-xl bg-slate-200'></div>
            <div className='h-48 animate-pulse rounded-xl bg-slate-200'></div>
          </div>

          <div className='h-64 animate-pulse rounded-xl bg-slate-200'></div>
        </div>
      </div>
    </DashboardLayout>
  );
}
