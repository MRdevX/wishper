import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { SecurityItem } from '../common/security-item';
import { Lock } from 'lucide-react';

interface SecuritySectionProps {
  onPasswordChange?: () => void;
  className?: string;
}

export function SecuritySection({ onPasswordChange, className = '' }: SecuritySectionProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your account security settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <SecurityItem
            title='Password'
            description='Update your password to keep your account secure.'
            actionLabel='Change Password'
            onAction={onPasswordChange || (() => {})}
            icon={Lock}
          />
        </div>
      </CardContent>
    </Card>
  );
}
