import { Users, Gift, List, TrendingUp } from 'lucide-react';
import { StatsCard } from '../common/stats-card';

interface AdminStatsSectionProps {
  stats: {
    totalUsers: number;
    totalWishes: number;
    totalWishlists: number;
    activeUsers: number;
  };
  loading?: boolean;
}

export function AdminStatsSection({ stats, loading }: AdminStatsSectionProps) {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <StatsCard
        title='Total Users'
        value={loading ? '...' : stats.totalUsers}
        description='+0% from last month'
        icon={Users}
        iconColor='text-blue-600'
        valueColor='text-3xl font-bold text-blue-700'
        bgColor='bg-blue-50'
        borderColor='border-blue-200'
      />
      <StatsCard
        title='Total Wishes'
        value={loading ? '...' : stats.totalWishes}
        description='+0% from last month'
        icon={Gift}
        iconColor='text-purple-600'
        valueColor='text-3xl font-bold text-purple-700'
        bgColor='bg-purple-50'
        borderColor='border-purple-200'
      />
      <StatsCard
        title='Total Wishlists'
        value={loading ? '...' : stats.totalWishlists}
        description='+0% from last month'
        icon={List}
        iconColor='text-green-600'
        valueColor='text-3xl font-bold text-green-700'
        bgColor='bg-green-50'
        borderColor='border-green-200'
      />
      <StatsCard
        title='Active Users'
        value={loading ? '...' : stats.activeUsers}
        description='+0% from last month'
        icon={TrendingUp}
        iconColor='text-orange-600'
        valueColor='text-3xl font-bold text-orange-700'
        bgColor='bg-orange-50'
        borderColor='border-orange-200'
      />
    </div>
  );
}
