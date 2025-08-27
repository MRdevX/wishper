import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Palette } from 'lucide-react';

interface ThemeSettingsProps {
  currentTheme?: 'light' | 'dark' | 'system';
  onThemeChange?: (theme: 'light' | 'dark' | 'system') => void;
  className?: string;
}

export function ThemeSettings({
  currentTheme = 'system',
  onThemeChange,
  className = '',
}: ThemeSettingsProps) {
  return (
    <Card
      className={`border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
    >
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-slate-900'>
          <div className='rounded-lg bg-purple-100 p-2'>
            <Palette className='h-5 w-5 text-purple-600' />
          </div>
          Appearance
        </CardTitle>
        <CardDescription>Customize the appearance of your dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <label htmlFor='theme' className='text-sm font-semibold text-slate-700'>
              Theme
            </label>
            <select
              id='theme'
              value={currentTheme}
              onChange={e => onThemeChange?.(e.target.value as 'light' | 'dark' | 'system')}
              className='mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
            >
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
              <option value='system'>System</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
