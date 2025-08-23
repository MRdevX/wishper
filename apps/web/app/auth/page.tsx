'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '../../components/auth/login-form';
import { RegisterForm } from '../../components/auth/register-form';
import { PageLayout } from '@repo/ui/components/page-layout';
import { Heart } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuthSuccess = () => {
    router.push('/dashboard');
  };

  return (
    <PageLayout>
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
    </PageLayout>
  );
}
