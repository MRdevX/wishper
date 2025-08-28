import { Badge } from '@repo/ui/components/badge';
import { WishStatus } from '@repo/schemas';

interface IStatusBadgeProps {
  status: WishStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: IStatusBadgeProps) {
  const getStatusColor = (status: WishStatus) => {
    switch (status) {
      case WishStatus.ACHIEVED:
        return 'bg-green-100 text-green-800 border-green-200';
      case WishStatus.ACTIVE:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case WishStatus.ARCHIVED:
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return <Badge className={`${getStatusColor(status)} ${className}`}>{status}</Badge>;
}

interface IPriorityBadgeProps {
  priority: string;
  className?: string;
}

export function PriorityBadge({ priority, className = '' }: IPriorityBadgeProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return <Badge className={`${getPriorityColor(priority)} ${className}`}>{priority}</Badge>;
}
