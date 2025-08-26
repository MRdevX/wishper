import { DashboardLayout } from '../layout/dashboard-layout';
import { ProfileCard } from '../common/profile-card';
import { ProfileForm } from './profile-form';
import { SecuritySection } from './security-section';
import { Mail } from 'lucide-react';
import type { IUpdateUserDto } from '@repo/schemas';

interface ProfileLayoutProps {
  user: {
    id: string;
    name?: string;
    email?: string;
    createdAt?: string | Date;
  };
  onProfileUpdate: (data: IUpdateUserDto) => Promise<{ success: boolean; error?: string }>;
  onPasswordChange?: () => void;
  loading?: boolean;
}

export function ProfileLayout({
  user,
  onProfileUpdate,
  onPasswordChange,
  loading = false,
}: ProfileLayoutProps) {
  const avatarInitial = user.name
    ? user.name.charAt(0).toUpperCase()
    : user.email
      ? user.email.charAt(0).toUpperCase()
      : 'U';

  const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : undefined;

  const initialFormData: IUpdateUserDto = {
    name: user.name || '',
    email: user.email || '',
  };

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>Profile</h1>
          <p className='mt-2 text-slate-600'>Manage your account information and preferences.</p>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Profile Card */}
          <div className='lg:col-span-1'>
            <ProfileCard
              name={user.name || 'User'}
              email={user.email || ''}
              avatarInitial={avatarInitial}
              memberSince={memberSince}
              icon={Mail}
            />
          </div>

          {/* Profile Form and Security */}
          <div className='space-y-6 lg:col-span-2'>
            <ProfileForm
              initialData={initialFormData}
              onSubmit={onProfileUpdate}
              loading={loading}
            />
            <SecuritySection onPasswordChange={onPasswordChange} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
