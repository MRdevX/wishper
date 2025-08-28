'use client';

import { useDataFetching } from '@/hooks/useDataFetching';
import { DashboardService } from '@/lib/services/dashboard.service';

interface AdminStats {
  totalUsers: number;
  totalWishes: number;
  totalWishlists: number;
  activeUsers: number;
}

export function useAdminStats() {
  const {
    data: stats,
    loading,
    refetch,
  } = useDataFetching<AdminStats>({
    fetchFn: DashboardService.getStats,
  });

  return {
    stats: stats || {
      totalUsers: 0,
      totalWishes: 0,
      totalWishlists: 0,
      activeUsers: 0,
    },
    loading,
    refetch,
  };
}
