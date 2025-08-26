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

const STATS_CONFIG = [
  {
    title: 'Total Wishlists',
    key: 'totalWishlists' as const,
    description: 'Your wishlists',
    icon: List,
    iconColor: 'text-blue-600',
    valueColor: 'text-3xl font-bold text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    title: 'Total Wishes',
    key: 'totalWishes' as const,
    description: 'All your wishes',
    icon: Gift,
    iconColor: 'text-purple-600',
    valueColor: 'text-3xl font-bold text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    title: 'Achieved',
    key: 'completedWishes' as const,
    description: 'Wishes achieved',
    icon: Heart,
    iconColor: 'text-green-600',
    valueColor: 'text-3xl font-bold text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    title: 'Active',
    key: 'pendingWishes' as const,
    description: 'Still active',
    icon: Clock,
    iconColor: 'text-orange-600',
    valueColor: 'text-3xl font-bold text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
];

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {STATS_CONFIG.map(
        ({ title, key, description, icon, iconColor, valueColor, bgColor, borderColor }) => (
          <StatsCard
            key={key}
            title={title}
            value={stats[key]}
            description={description}
            icon={icon}
            iconColor={iconColor}
            valueColor={valueColor}
            bgColor={bgColor}
            borderColor={borderColor}
          />
        )
      )}
    </div>
  );
}
