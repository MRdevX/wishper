'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/lib/auth-context';
import { LoginForm } from '@/features/auth/login-form';
import { RegisterForm } from '@/features/auth/register-form';
import { PageLayout } from '@repo/ui/components/page-layout';
import { Heart } from 'lucide-react';

function AuthContent() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuthContext();

  const handleAuthSuccess = () => {
    const redirectTo = searchParams.get('redirect') || '/dashboard';
    router.push(redirectTo);
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4'>
        <div className='text-center'>
          <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg'>
            <Heart className='h-8 w-8 text-white' />
          </div>
          <h1 className='text-2xl font-bold text-slate-900'>Wishper</h1>
          <p className='mt-2 text-slate-600'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='mb-8 text-center'>
          <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg'>
            <Heart className='h-8 w-8 text-white' />
          </div>
          <h1 className='text-2xl font-bold text-slate-900'>Wishper</h1>
          <p className='mt-2 text-slate-600'>Your personal wishlist app</p>
        </div>

        {/* Auth Form */}
        {isLogin ? (
          <LoginForm onSuccess={handleAuthSuccess} onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSuccess={handleAuthSuccess} onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

function AuthLoading() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4'>
      <div className='text-center'>
        <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg'>
          <Heart className='h-8 w-8 text-white' />
        </div>
        <h1 className='text-2xl font-bold text-slate-900'>Wishper</h1>
        <p className='mt-2 text-slate-600'>Loading...</p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <PageLayout>
      <Suspense fallback={<AuthLoading />}>
        <AuthContent />
      </Suspense>
    </PageLayout>
  );
}
