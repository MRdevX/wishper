import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { SecurityItem } from '../common/security-item';
import { Lock, Shield, Key } from 'lucide-react';

interface SecuritySectionProps {
  onPasswordChange?: () => void;
  className?: string;
}

export function SecuritySection({ onPasswordChange, className = '' }: SecuritySectionProps) {
  return (
    <Card
      className={`border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
    >
      <CardHeader className='pb-6'>
        <CardTitle className='flex items-center gap-3 text-slate-900'>
          <div className='rounded-xl bg-gradient-to-r from-red-500 to-red-600 p-2.5 shadow-md'>
            <Shield className='h-6 w-6 text-white' />
          </div>
          <span className='text-xl font-bold'>Security Settings</span>
        </CardTitle>
        <CardDescription className='text-base text-slate-600'>
          Manage your account security and privacy settings.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <SecurityItem
            title='Password Security'
            description='Update your password to keep your account secure and protected.'
            actionLabel='Change Password'
            onAction={onPasswordChange || (() => {})}
            icon={Key}
          />

          <SecurityItem
            title='Two-Factor Authentication'
            description='Add an extra layer of security to your account with 2FA.'
            actionLabel='Enable 2FA'
            onAction={() => console.log('2FA clicked')}
            icon={Lock}
          />
        </div>
      </CardContent>
    </Card>
  );
}
