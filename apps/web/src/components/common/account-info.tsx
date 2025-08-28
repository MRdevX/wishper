import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Settings, User, Calendar } from 'lucide-react';

interface AccountInfoProps {
  user: {
    id: string;
    name?: string;
    email?: string;
    createdAt?: string | Date;
  };
  className?: string;
}

export function AccountInfo({ user, className = '' }: AccountInfoProps) {
  const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';

  return (
    <Card
      className={`border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
    >
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-slate-900'>
          <div className='rounded-lg bg-green-100 p-2'>
            <Settings className='h-5 w-5 text-green-600' />
          </div>
          Account Information
        </CardTitle>
        <CardDescription>View your account details and statistics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center gap-3 rounded-lg bg-slate-50 p-3'>
            <User className='h-5 w-5 text-slate-500' />
            <div>
              <label className='text-sm font-semibold text-slate-600'>Email</label>
              <p className='font-medium text-slate-900'>{user.email || 'Not set'}</p>
            </div>
          </div>
          <div className='flex items-center gap-3 rounded-lg bg-slate-50 p-3'>
            <User className='h-5 w-5 text-slate-500' />
            <div>
              <label className='text-sm font-semibold text-slate-600'>Name</label>
              <p className='font-medium text-slate-900'>{user.name || 'Not set'}</p>
            </div>
          </div>
          <div className='flex items-center gap-3 rounded-lg bg-slate-50 p-3'>
            <Calendar className='h-5 w-5 text-slate-500' />
            <div>
              <label className='text-sm font-semibold text-slate-600'>Member Since</label>
              <p className='font-medium text-slate-900'>{memberSince}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
