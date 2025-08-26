import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  valueColor?: string;
  bgColor?: string;
  borderColor?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = 'text-slate-600',
  valueColor = 'text-3xl font-bold',
  bgColor = 'bg-white',
  borderColor = 'border-slate-200',
}: StatsCardProps) {
  return (
    <Card className={cn('transition-all duration-200 hover:shadow-md', bgColor, borderColor)}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-3'>
        <CardTitle className='text-sm font-semibold text-slate-700'>{title}</CardTitle>
        <div
          className={cn('rounded-lg p-2', bgColor === 'bg-white' ? 'bg-slate-100' : 'bg-white/80')}
        >
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className={cn('mb-1', valueColor)}>{value}</div>
        <p className='text-sm font-medium text-slate-600'>{description}</p>
      </CardContent>
    </Card>
  );
}
