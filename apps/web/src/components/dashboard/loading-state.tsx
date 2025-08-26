import { DashboardLayout } from '../layout/dashboard-layout';

export function LoadingState() {
  return (
    <DashboardLayout>
      <div className='flex h-64 items-center justify-center'>
        <div className='text-slate-600'>Loading dashboard...</div>
      </div>
    </DashboardLayout>
  );
}
