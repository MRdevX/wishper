'use client';

import { useAuthContext } from '@/lib/auth-context';
import type { IRegisterDto } from '@repo/schemas';
import { useForm } from '@/hooks/useForm';
import { AuthCard, AuthLinkButton } from '@repo/ui/components/auth-card';
import { FormFieldComponent, BaseForm } from '@repo/ui/components/common';

interface IRegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

const validateRegisterForm = (
  values: IRegisterDto
): Partial<Record<keyof IRegisterDto, string>> => {
  const errors: Partial<Record<keyof IRegisterDto, string>> = {};

  if (!values.name?.trim()) {
    errors.name = 'Name is required';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return errors;
};

export function RegisterForm({ onSuccess, onSwitchToLogin }: IRegisterFormProps) {
  const { register } = useAuthContext();

  const form = useForm<IRegisterDto>({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    onSubmit: async values => {
      return await register(values);
    },
    onSuccess,
    validate: validateRegisterForm,
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
          required
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
