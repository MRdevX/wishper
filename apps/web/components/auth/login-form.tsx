'use client';

import { useAuthContext } from '../auth-provider';
import { LoginDto } from '../../lib/api';
import { useForm } from '../../hooks/use-form';
import { AuthCard, AuthLinkButton } from '@repo/ui/components/auth-card';
import { FormField, FormLabel, FormInput, FormErrorMessage } from '@repo/ui/components/form';
import { Button } from '@repo/ui/components/button';

interface ILoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: ILoginFormProps) {
  const { login } = useAuthContext();

  const form = useForm<LoginDto>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      return await login(values);
    },
    onSuccess,
  });

  const footer = onSwitchToRegister && (
    <AuthLinkButton onClick={onSwitchToRegister}>
      Don&apos;t have an account? Sign up
    </AuthLinkButton>
  );

  return (
    <AuthCard
      title='Welcome back'
      description='Enter your credentials to access your account'
      footer={footer}
    >
      <form onSubmit={form.handleSubmit} className='space-y-4'>
        <FormField>
          <FormLabel htmlFor='email' required>
            Email
          </FormLabel>
          <FormInput
            id='email'
            type='email'
            placeholder='Enter your email'
            value={form.values.email}
            onChange={form.handleInputChange('email')}
            error={form.errors.email}
            required
            disabled={form.isLoading}
          />
          <FormErrorMessage>{form.errors.email}</FormErrorMessage>
        </FormField>

        <FormField>
          <FormLabel htmlFor='password' required>
            Password
          </FormLabel>
          <FormInput
            id='password'
            type='password'
            placeholder='Enter your password'
            value={form.values.password}
            onChange={form.handleInputChange('password')}
            error={form.errors.password}
            required
            disabled={form.isLoading}
          />
          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
        </FormField>

        <FormErrorMessage>{form.submitError}</FormErrorMessage>

        <Button type='submit' className='w-full' disabled={form.isLoading}>
          {form.isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </AuthCard>
  );
}
