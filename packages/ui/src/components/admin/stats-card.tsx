import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card className='border-gray-200 bg-white'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium text-gray-700'>{title}</CardTitle>
        <Icon className='h-4 w-4 text-gray-400' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold text-gray-900'>{value}</div>
        {description && <p className='mt-1 text-xs text-gray-500'>{description}</p>}
        {trend && (
          <p className={`mt-1 text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : ''}
            {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
