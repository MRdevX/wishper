import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { EmptyState } from '../common/empty-state';
import { Activity } from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp?: string;
}

interface AdminRecentActivityProps {
  activities?: ActivityItem[];
}

export function AdminRecentActivity({ activities = [] }: AdminRecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions in your application</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className='space-y-4'>
            {activities.map(activity => (
              <div key={activity.id} className='flex items-center space-x-3'>
                <div className='h-2 w-2 rounded-full bg-gray-300'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-900'>{activity.title}</p>
                  <p className='text-xs text-gray-500'>{activity.description}</p>
                  {activity.timestamp && (
                    <p className='text-xs text-gray-400'>{activity.timestamp}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Activity}
            description='No recent activity to display'
            actionText='View All'
            actionHref='/admin'
          />
        )}
      </CardContent>
    </Card>
  );
}
