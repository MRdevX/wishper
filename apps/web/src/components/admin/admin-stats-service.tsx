'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

interface AdminStats {
  totalUsers: number;
  totalWishes: number;
  totalWishlists: number;
  activeUsers: number;
}

interface UseAdminStatsProps {
  onStatsUpdate?: (stats: AdminStats) => void;
}

export function useAdminStats({ onStatsUpdate }: UseAdminStatsProps = {}) {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalWishes: 0,
    totalWishlists: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [usersResponse, wishesResponse, wishlistsResponse] = await Promise.all([
        apiClient.getUsers(),
        apiClient.getWishes(),
        apiClient.getWishlists(),
      ]);

      const users = usersResponse.success ? (usersResponse.data as any[]) || [] : [];
      const wishes = wishesResponse.success ? (wishesResponse.data as any[]) || [] : [];
      const wishlists = wishlistsResponse.success ? (wishlistsResponse.data as any[]) || [] : [];

      const newStats = {
        totalUsers: users.length,
        totalWishes: wishes.length,
        totalWishlists: wishlists.length,
        activeUsers: users.length,
      };

      setStats(newStats);
      onStatsUpdate?.(newStats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    refetch: fetchStats,
  };
}
