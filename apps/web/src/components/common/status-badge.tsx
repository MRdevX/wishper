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
