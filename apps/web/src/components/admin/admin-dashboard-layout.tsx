import { AdminLayout } from '@repo/ui';
import { StatsCard } from '../common/stats-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { LucideIcon } from 'lucide-react';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  stats?: Array<{
    title: string;
    value: string | number;
    description: string;
    icon: LucideIcon;
    loading?: boolean;
  }>;
}

export function AdminDashboardLayout({ children, stats }: AdminDashboardLayoutProps) {
  return (
    <AdminLayout>
      <div className='space-y-6'>
        {stats && (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.loading ? '...' : stat.value}
                description={stat.description}
                icon={stat.icon}
              />
            ))}
          </div>
        )}
        {children}
      </div>
    </AdminLayout>
  );
}
