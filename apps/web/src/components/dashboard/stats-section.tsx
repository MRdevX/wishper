import { Gift, List, Heart, Clock } from 'lucide-react';
import { StatsCard } from '../common/stats-card';

interface StatsSectionProps {
  stats: {
    totalWishlists: number;
    totalWishes: number;
    completedWishes: number;
    pendingWishes: number;
  };
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
      <StatsCard
        title='Total Wishlists'
        value={stats.totalWishlists}
        description='Your wishlists'
        icon={List}
        iconColor='text-blue-600'
        valueColor='text-3xl font-bold text-blue-700'
        bgColor='bg-blue-50'
        borderColor='border-blue-200'
      />
      <StatsCard
        title='Total Wishes'
        value={stats.totalWishes}
        description='All your wishes'
        icon={Gift}
        iconColor='text-purple-600'
        valueColor='text-3xl font-bold text-purple-700'
        bgColor='bg-purple-50'
        borderColor='border-purple-200'
      />
      <StatsCard
        title='Achieved'
        value={stats.completedWishes}
        description='Wishes achieved'
        icon={Heart}
        iconColor='text-green-600'
        valueColor='text-3xl font-bold text-green-700'
        bgColor='bg-green-50'
        borderColor='border-green-200'
      />
      <StatsCard
        title='Active'
        value={stats.pendingWishes}
        description='Still active'
        icon={Clock}
        iconColor='text-orange-600'
        valueColor='text-3xl font-bold text-orange-700'
        bgColor='bg-orange-50'
        borderColor='border-orange-200'
      />
    </div>
  );
}
