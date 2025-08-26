import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  valueColor?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = 'text-slate-600',
  valueColor = 'text-2xl font-bold',
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className={valueColor}>{value}</div>
        <p className='text-xs text-slate-600'>{description}</p>
      </CardContent>
    </Card>
  );
}
