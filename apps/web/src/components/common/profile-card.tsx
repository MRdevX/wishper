import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Avatar } from '@repo/ui/components/avatar';
import { LucideIcon, Calendar, Mail } from 'lucide-react';

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
    <Card
      className={`border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
    >
      <CardHeader className='pb-6 text-center'>
        <div className='mb-6 flex justify-center'>
          <div className='relative'>
            <Avatar className='h-28 w-28 shadow-lg ring-4 ring-slate-100'>
              <div className='flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-3xl font-bold text-white shadow-lg'>
                {avatarInitial}
              </div>
            </Avatar>
            <div className='absolute -bottom-2 -right-2 rounded-full bg-green-500 p-1.5 shadow-lg'>
              <div className='h-3 w-3 rounded-full bg-white'></div>
            </div>
          </div>
        </div>
        <CardTitle className='mb-2 text-2xl font-bold text-slate-900'>{name}</CardTitle>
        <CardDescription className='flex items-center justify-center gap-2 text-slate-600'>
          <Mail className='h-4 w-4 text-slate-500' />
          <span className='text-base font-medium'>{email}</span>
        </CardDescription>
      </CardHeader>
      {memberSince && (
        <CardContent className='pt-0'>
          <div className='space-y-4'>
            <div className='flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-4 text-slate-700'>
              <Calendar className='h-5 w-5 text-slate-600' />
              <div className='text-center'>
                <p className='text-sm font-semibold text-slate-800'>Member since</p>
                <p className='text-base font-bold text-slate-900'>{memberSince}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className='grid grid-cols-2 gap-3'>
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-3 text-center'>
                <p className='text-2xl font-bold text-blue-700'>12</p>
                <p className='text-xs font-medium text-blue-600'>Wishlists</p>
              </div>
              <div className='rounded-lg border border-purple-200 bg-purple-50 p-3 text-center'>
                <p className='text-2xl font-bold text-purple-700'>48</p>
                <p className='text-xs font-medium text-purple-600'>Wishes</p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
