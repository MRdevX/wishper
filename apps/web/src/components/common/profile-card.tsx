import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Avatar } from '@repo/ui/components/avatar';
import { LucideIcon } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  email: string;
  avatarInitial: string;
  memberSince?: string;
  icon?: LucideIcon;
  className?: string;
}

export function ProfileCard({
  name,
  email,
  avatarInitial,
  memberSince,
  icon: Icon,
  className = '',
}: ProfileCardProps) {
  return (
    <Card className={className}>
      <CardHeader className='text-center'>
        <div className='mb-4 flex justify-center'>
          <Avatar className='h-24 w-24'>
            <div className='flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-2xl font-bold text-white'>
              {avatarInitial}
            </div>
          </Avatar>
        </div>
        <CardTitle className='text-xl'>{name}</CardTitle>
        <CardDescription className='flex items-center justify-center gap-2'>
          {Icon && <Icon className='h-4 w-4' />}
          {email}
        </CardDescription>
      </CardHeader>
      {memberSince && (
        <CardContent>
          <div className='space-y-3 text-sm'>
            <div className='flex items-center gap-2 text-slate-600'>
              <span>Member since {memberSince}</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
