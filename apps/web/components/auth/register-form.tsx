'use client';

import { useAuthContext } from '../../contexts/auth-context';
import type { RegisterDto } from '../../types';
import { useForm } from '../../hooks/use-form';
import { AuthCard, AuthLinkButton } from '@repo/ui/components/auth-card';
import { FormFieldComponent, BaseForm } from '@repo/ui/components/common';

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
      <BaseForm
        onSubmit={form.handleSubmit}
        submitLabel='Create account'
        isLoading={form.isLoading}
        error={form.submitError}
      >
        <FormFieldComponent
          label='Name'
          name='name'
          type='text'
          placeholder='Enter your name'
          value={form.values.name}
          onChange={form.handleInputChange('name')}
          error={form.errors.name}
          disabled={form.isLoading}
        />

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
          minLength={6}
          disabled={form.isLoading}
        />
      </BaseForm>
    </AuthCard>
  );
}
