'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { useAuthContext } from '../auth-provider';
import { LoginDto } from '../../lib/api';

interface ILoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: ILoginFormProps) {
  const { login, isLoading, error, clearError } = useAuthContext();
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    console.log('Attempting login with:', formData);

    const success = await login(formData);
    console.log('Login result:', success);

    if (success && onSuccess) {
      onSuccess();
    }
  };

  const handleInputChange = (field: keyof LoginDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-center text-2xl font-bold'>Welcome back</CardTitle>
        <CardDescription className='text-center'>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='email' className='text-sm font-medium'>
              Email
            </label>
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              disabled={isLoading}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='password' className='text-sm font-medium'>
              Password
            </label>
            <Input
              id='password'
              type='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleInputChange('password')}
              required
              disabled={isLoading}
            />
          </div>
          {error && <div className='rounded-md bg-red-50 p-3 text-sm text-red-600'>{error}</div>}
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <div className='mt-4 text-center'>
          <button
            type='button'
            onClick={onSwitchToRegister}
            className='text-sm text-blue-600 underline hover:text-blue-800'
          >
            Don&apos;t have an account? Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
