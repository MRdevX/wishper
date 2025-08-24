'use client';

import { useAuthContext } from '../auth-provider';
import { RegisterDto } from '../../lib/api';
import { useForm } from '../../hooks/use-form';
import { AuthCard, AuthLinkButton } from '@repo/ui/components/auth-card';
import { FormField, FormLabel, FormInput, FormErrorMessage } from '@repo/ui/components/form';
import { Button } from '@repo/ui/components/button';

interface IRegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: IRegisterFormProps) {
  const { register } = useAuthContext();

  const form = useForm<RegisterDto>({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    onSubmit: async values => {
      return await register(values);
    },
    onSuccess,
  });

  const footer = onSwitchToLogin && (
    <AuthLinkButton onClick={onSwitchToLogin}>Already have an account? Sign in</AuthLinkButton>
  );

  return (
    <AuthCard
      title='Create account'
      description='Enter your details to create your account'
      footer={footer}
    >
      <form onSubmit={form.handleSubmit} className='space-y-4'>
        <FormField>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <FormInput
            id='name'
            type='text'
            placeholder='Enter your name'
            value={form.values.name}
            onChange={form.handleInputChange('name')}
            error={form.errors.name}
            disabled={form.isLoading}
          />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormField>

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
            minLength={6}
            disabled={form.isLoading}
          />
          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
        </FormField>

        <FormErrorMessage>{form.submitError}</FormErrorMessage>

        <Button type='submit' className='w-full' disabled={form.isLoading}>
          {form.isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </AuthCard>
  );
}
