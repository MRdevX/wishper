import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';

interface QuickAction {
  title: string;
  description: string;
  href: string;
}

interface AdminQuickActionsProps {
  title?: string;
  description?: string;
  actions: QuickAction[];
  className?: string;
}

export function AdminQuickActions({
  title = 'Quick Actions',
  description = 'Common administrative tasks',
  actions,
  className = '',
}: AdminQuickActionsProps) {
  return (
    <Card className={`border-gray-200 ${className}`}>
      <CardHeader className='pb-4'>
        <CardTitle className='text-lg'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {actions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className='block rounded-lg border border-gray-200 p-3 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50'
            >
              <div className='font-medium text-gray-900'>{action.title}</div>
              <div className='text-sm text-gray-500'>{action.description}</div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
