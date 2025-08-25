'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/components/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Badge } from '@repo/ui/components/badge';
import { Heart, Gift, Users, Sparkles, ArrowRight, Star } from 'lucide-react';
import { useAuthContext } from '../contexts/auth-context';
import { Loading } from '../components/ui/loading';

export default function Page() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50'>
        <Loading size='lg' text='Loading...' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      {/* Hero Section */}
      <div className='container mx-auto px-6 py-24'>
        <div className='mx-auto max-w-4xl text-center'>
          <div className='mb-8 flex justify-center'>
            <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg'>
              <Heart className='h-8 w-8 text-white' />
            </div>
          </div>

          <Badge variant='outline' className='mb-6 border-pink-200 text-pink-700'>
            <Sparkles className='mr-1 h-3 w-3' />
            Personal Wishlist App
          </Badge>

          <h1 className='mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-6xl font-bold text-transparent'>
            Wishper
          </h1>

          <p className='mb-8 text-xl leading-relaxed text-slate-600'>
            Create, share, and manage your wishlists with ease. The perfect way to keep track of
            what you want and help others find the perfect gift.
          </p>

          <div className='flex justify-center gap-4'>
            <Button
              size='lg'
              className='bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
              onClick={() => router.push('/auth')}
            >
              Get Started
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button variant='outline' size='lg' onClick={() => router.push('/auth')}>
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='bg-white/50 py-20'>
        <div className='container mx-auto px-6'>
          <div className='mx-auto mb-16 max-w-2xl text-center'>
            <h2 className='mb-4 text-3xl font-bold text-slate-900'>Why Choose Wishper?</h2>
            <p className='text-slate-600'>Simple, beautiful, and powerful wishlist management</p>
          </div>

          <div className='grid gap-8 md:grid-cols-3'>
            <Card className='border-0 bg-white/70 shadow-sm backdrop-blur-sm'>
              <CardHeader>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500'>
                  <Heart className='h-6 w-6 text-white' />
                </div>
                <CardTitle className='text-slate-900'>Create Beautiful Lists</CardTitle>
                <CardDescription className='text-slate-600'>
                  Organize your wishes with categories, priorities, and beautiful descriptions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='border-0 bg-white/70 shadow-sm backdrop-blur-sm'>
              <CardHeader>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500'>
                  <Users className='h-6 w-6 text-white' />
                </div>
                <CardTitle className='text-slate-900'>Share with Loved Ones</CardTitle>
                <CardDescription className='text-slate-600'>
                  Share your wishlists with family and friends to make gift-giving easier
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='border-0 bg-white/70 shadow-sm backdrop-blur-sm'>
              <CardHeader>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500'>
                  <Gift className='h-6 w-6 text-white' />
                </div>
                <CardTitle className='text-slate-900'>Track Gifts</CardTitle>
                <CardDescription className='text-slate-600'>
                  Mark items as received and keep track of who gave you what
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='py-20'>
        <div className='container mx-auto px-6'>
          <div className='mx-auto max-w-3xl text-center'>
            <div className='mb-8 flex justify-center'>
              <div className='flex space-x-1'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='h-6 w-6 fill-yellow-400 text-yellow-400' />
                ))}
              </div>
            </div>

            <h2 className='mb-4 text-3xl font-bold text-slate-900'>
              Ready to organize your wishes?
            </h2>
            <p className='mb-8 text-lg text-slate-600'>
              Join thousands of users who are already making gift-giving easier with Wishper
            </p>

            <Button
              size='lg'
              className='bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
              onClick={() => router.push('/auth')}
            >
              Start Your First Wishlist
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='border-t border-slate-200 bg-white/50 py-12 backdrop-blur-sm'>
        <div className='container mx-auto px-6 text-center'>
          <p className='text-slate-600'>Built with ❤️ using Next.js, NestJS, and Turborepo</p>
        </div>
      </div>
    </div>
  );
}
