'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageLayout } from '@/components/layout/page-layout';
import { ProtectedRoute } from '@/features/auth/protected-route';
import { useDataFetching } from '@/hooks/useDataFetching';
import { DashboardService } from '@/lib/services/dashboard.service';
import { useAuthContext } from '@/lib/auth-context';
import {
  LoadingState,
  StatsSection,
  QuickActionsSection,
  RecentActivitySection,
  RecentWishesSection,
} from '@/components/dashboard';

function DashboardContent() {
  const { user } = useAuthContext();
  const { data: stats, loading } = useDataFetching({
    fetchFn: DashboardService.getUserStats,
  });

  if (loading) {
    return <LoadingState />;
  }

  return (
    <DashboardLayout>
      <PageLayout
        title={`Welcome back, ${user?.name || user?.email}!`}
        description="Here's what's happening with your wishlists and wishes."
      >
        <StatsSection
          stats={
            stats || {
              totalWishlists: 0,
              totalWishes: 0,
              completedWishes: 0,
              pendingWishes: 0,
            }
          }
        />

        <div className='grid gap-6 md:grid-cols-2'>
          <QuickActionsSection />
          <RecentActivitySection recentWishlists={stats?.recentWishlists} />
        </div>

        <RecentWishesSection recentWishes={stats?.recentWishes} />
      </PageLayout>
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
