import { DashboardLayout } from '../layout/dashboard-layout';
import { ProfileCard } from '../common/profile-card';
import { ProfileForm } from './profile-form';
import { SecuritySection } from './security-section';
import { User, Settings } from 'lucide-react';
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
      <div className='space-y-8'>
        {/* Enhanced Header */}
        <div className='text-center lg:text-left'>
          <div className='flex items-center justify-center gap-3 lg:justify-start'>
            <div className='rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-3 shadow-lg'>
              <Settings className='h-6 w-6 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-slate-900 lg:text-4xl'>Profile</h1>
              <p className='mt-2 text-slate-600 lg:text-lg'>
                Manage your account information and preferences.
              </p>
            </div>
          </div>
        </div>

        <div className='grid gap-8 lg:grid-cols-3'>
          {/* Profile Card */}
          <div className='lg:col-span-1'>
            <ProfileCard
              name={user.name || 'User'}
              email={user.email || ''}
              avatarInitial={avatarInitial}
              memberSince={memberSince}
              icon={User}
            />
          </div>

          {/* Profile Form and Security */}
          <div className='space-y-8 lg:col-span-2'>
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
