import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Badge } from '@repo/ui/components/badge';
import { Settings, Database, Users, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900 lg:text-3xl'>Settings</h1>
        <p className='mt-2 text-gray-600'>Manage your application settings</p>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <Card className='border-gray-200'>
          <CardHeader className='pb-4'>
            <div className='flex items-center space-x-2'>
              <Database className='h-5 w-5 text-blue-600' />
              <CardTitle className='text-lg'>Database</CardTitle>
            </div>
            <CardDescription>Database configuration and status</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Status</span>
              <Badge className='border-green-200 bg-green-100 text-green-800'>Connected</Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Type</span>
              <span className='text-sm text-gray-900'>PostgreSQL</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Version</span>
              <span className='text-sm text-gray-900'>15.0</span>
            </div>
          </CardContent>
        </Card>

        <Card className='border-gray-200'>
          <CardHeader className='pb-4'>
            <div className='flex items-center space-x-2'>
              <Users className='h-5 w-5 text-green-600' />
              <CardTitle className='text-lg'>Users</CardTitle>
            </div>
            <CardDescription>User management settings</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Registration</span>
              <Badge className='border-blue-200 bg-blue-100 text-blue-800'>Enabled</Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Email Verification</span>
              <Badge className='border-green-200 bg-green-100 text-green-800'>Required</Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Max Users</span>
              <span className='text-sm text-gray-900'>Unlimited</span>
            </div>
          </CardContent>
        </Card>

        <Card className='border-gray-200'>
          <CardHeader className='pb-4'>
            <div className='flex items-center space-x-2'>
              <Shield className='h-5 w-5 text-purple-600' />
              <CardTitle className='text-lg'>Security</CardTitle>
            </div>
            <CardDescription>Security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>2FA</span>
              <Badge className='border-yellow-200 bg-yellow-100 text-yellow-800'>Optional</Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Session Timeout</span>
              <span className='text-sm text-gray-900'>24 hours</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Rate Limiting</span>
              <Badge className='border-green-200 bg-green-100 text-green-800'>Enabled</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className='border-gray-200'>
          <CardHeader className='pb-4'>
            <div className='flex items-center space-x-2'>
              <Bell className='h-5 w-5 text-orange-600' />
              <CardTitle className='text-lg'>Notifications</CardTitle>
            </div>
            <CardDescription>Notification preferences</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Email Notifications</span>
              <Badge className='border-green-200 bg-green-100 text-green-800'>Enabled</Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Push Notifications</span>
              <Badge className='border-gray-200 bg-gray-100 text-gray-800'>Disabled</Badge>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600'>Admin Alerts</span>
              <Badge className='border-green-200 bg-green-100 text-green-800'>Enabled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='border-gray-200'>
        <CardHeader className='pb-4'>
          <div className='flex items-center space-x-2'>
            <Settings className='h-5 w-5 text-gray-600' />
            <CardTitle className='text-lg'>System Actions</CardTitle>
          </div>
          <CardDescription>Important system operations</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex flex-wrap gap-4'>
            <Button variant='outline' className='border-gray-300 hover:bg-gray-50'>
              Clear Cache
            </Button>
            <Button variant='outline' className='border-gray-300 hover:bg-gray-50'>
              Backup Database
            </Button>
            <Button variant='outline' className='border-gray-300 hover:bg-gray-50'>
              Export Data
            </Button>
            <Button variant='outline' className='border-red-300 text-red-600 hover:bg-red-50'>
              Reset System
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
