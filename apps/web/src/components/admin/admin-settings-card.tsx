import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Badge } from '@repo/ui/components/badge';
import { LucideIcon } from 'lucide-react';

interface SettingItem {
  label: string;
  value: string | React.ReactNode;
  type?: 'text' | 'badge';
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

interface AdminSettingsCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  settings: SettingItem[];
  className?: string;
}

export function AdminSettingsCard({
  title,
  description,
  icon: Icon,
  iconColor = 'text-gray-600',
  settings,
  className = '',
}: AdminSettingsCardProps) {
  return (
    <Card className={`border-gray-200 ${className}`}>
      <CardHeader className='pb-4'>
        <div className='flex items-center space-x-2'>
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <CardTitle className='text-lg'>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {settings.map((setting, index) => (
          <div key={index} className='flex items-center justify-between'>
            <span className='text-sm text-gray-600'>{setting.label}</span>
            {setting.type === 'badge' ? (
              <Badge
                variant={setting.badgeVariant || 'default'}
                className='border-gray-200 bg-gray-100 text-gray-800'
              >
                {setting.value}
              </Badge>
            ) : (
              <span className='text-sm text-gray-900'>{setting.value}</span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
