import { Button } from '../button';
import { Eye, Edit, Trash2, ExternalLink } from 'lucide-react';

interface TableActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  externalLink?: string;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showExternalLink?: boolean;
}

export function TableActions({
  onView,
  onEdit,
  onDelete,
  externalLink,
  showView = true,
  showEdit = true,
  showDelete = true,
  showExternalLink = false,
}: TableActionsProps) {
  return (
    <div className='flex items-center space-x-2'>
      {showView && onView && (
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={onView}>
          <Eye className='h-4 w-4' />
        </Button>
      )}

      {showExternalLink && externalLink && (
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0' asChild>
          <a href={externalLink} target='_blank' rel='noopener noreferrer'>
            <ExternalLink className='h-4 w-4' />
          </a>
        </Button>
      )}

      {showEdit && onEdit && (
        <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={onEdit}>
          <Edit className='h-4 w-4' />
        </Button>
      )}

      {showDelete && onDelete && (
        <Button
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700'
          onClick={onDelete}
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      )}
    </div>
  );
}
