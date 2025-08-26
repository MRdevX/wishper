import { Gift, List, Heart } from 'lucide-react';
import { StatsCard } from '../common/stats-card';

interface StatsSectionProps {
  stats: {
    totalWishlists: number;
    totalWishes: number;
    completedWishes: number;
    pendingWishes: number;
  };
}

const STATS_CONFIG = [
  {
    title: 'Total Wishlists',
    key: 'totalWishlists' as const,
    description: 'Your wishlists',
    icon: List,
    iconColor: 'text-slate-600',
    valueColor: 'text-2xl font-bold',
  },
  {
    title: 'Total Wishes',
    key: 'totalWishes' as const,
    description: 'All your wishes',
    icon: Gift,
    iconColor: 'text-slate-600',
    valueColor: 'text-2xl font-bold',
  },
  {
    title: 'Achieved',
    key: 'completedWishes' as const,
    description: 'Wishes achieved',
    icon: Heart,
    iconColor: 'text-green-600',
    valueColor: 'text-2xl font-bold text-green-600',
  },
  {
    title: 'Active',
    key: 'pendingWishes' as const,
    description: 'Still active',
    icon: Gift,
    iconColor: 'text-orange-600',
    valueColor: 'text-2xl font-bold text-orange-600',
  },
];

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {STATS_CONFIG.map(({ title, key, description, icon, iconColor, valueColor }) => (
        <StatsCard
          key={key}
          title={title}
          value={stats[key]}
          description={description}
          icon={icon}
          iconColor={iconColor}
          valueColor={valueColor}
        />
      ))}
    </div>
  );
}
