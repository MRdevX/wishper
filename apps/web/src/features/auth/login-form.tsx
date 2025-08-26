'use client';

import { useAuthContext } from '@/lib/auth-context';
import type { ILoginDto } from '@repo/schemas';
import { useForm } from '@/hooks/useForm';
import { AuthCard, AuthLinkButton } from '@repo/ui/components/auth-card';
import { FormFieldComponent, BaseForm } from '@repo/ui/components/common';

interface ILoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: ILoginFormProps) {
  const { login } = useAuthContext();

  const form = useForm<ILoginDto>({
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
      <BaseForm
        onSubmit={form.handleSubmit}
        submitLabel='Sign in'
        isLoading={form.isLoading}
        error={form.submitError}
      >
        <FormFieldComponent
          label='Email'
          name='email'
          type='email'
          placeholder='Enter your email'
          value={form.values.email}
          onChange={form.handleInputChange('email')}
          error={form.errors.email}
          required
          disabled={form.isLoading}
        />

        <FormFieldComponent
          label='Password'
          name='password'
          type='password'
          placeholder='Enter your password'
          value={form.values.password}
          onChange={form.handleInputChange('password')}
          error={form.errors.password}
          required
          disabled={form.isLoading}
        />
      </BaseForm>
    </AuthCard>
  );
}
