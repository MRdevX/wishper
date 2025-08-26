import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp?: string;
}

interface AdminRecentActivityProps {
  title?: string;
  description?: string;
  activities?: ActivityItem[];
  emptyMessage?: string;
  className?: string;
}

export function AdminRecentActivity({
  title = 'Recent Activity',
  description = 'Latest actions in your application',
  activities = [],
  emptyMessage = 'No recent activity',
  className = '',
}: AdminRecentActivityProps) {
  return (
    <Card className={`border-gray-200 ${className}`}>
      <CardHeader className='pb-4'>
        <CardTitle className='text-lg'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {activities.length > 0 ? (
            activities.map(activity => (
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
            ))
          ) : (
            <div className='flex items-center space-x-3'>
              <div className='h-2 w-2 rounded-full bg-gray-300'></div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-900'>{emptyMessage}</p>
                <p className='text-xs text-gray-500'>Get started by creating some data</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
