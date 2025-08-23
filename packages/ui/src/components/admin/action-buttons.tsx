import { Button } from '../button';
import { Eye, Edit, Trash2, ExternalLink } from 'lucide-react';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onExternalLink?: () => void;
  externalLinkUrl?: string;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showExternalLink?: boolean;
}

export function ActionButtons({
  onView,
  onEdit,
  onDelete,
  onExternalLink,
  externalLinkUrl,
  showView = true,
  showEdit = true,
  showDelete = true,
  showExternalLink = false,
}: ActionButtonsProps) {
  return (
    <div className='flex space-x-2'>
      {showView && onView && (
        <Button variant='ghost' size='sm' onClick={onView}>
          <Eye className='h-4 w-4' />
        </Button>
      )}
      {showExternalLink && (externalLinkUrl || onExternalLink) && (
        <Button variant='ghost' size='sm' asChild={!!externalLinkUrl} onClick={onExternalLink}>
          {externalLinkUrl ? (
            <a href={externalLinkUrl} target='_blank' rel='noopener noreferrer'>
              <ExternalLink className='h-4 w-4' />
            </a>
          ) : (
            <ExternalLink className='h-4 w-4' />
          )}
        </Button>
      )}
      {showEdit && onEdit && (
        <Button variant='ghost' size='sm' onClick={onEdit}>
          <Edit className='h-4 w-4' />
        </Button>
      )}
      {showDelete && onDelete && (
        <Button
          variant='ghost'
          size='sm'
          onClick={onDelete}
          className='text-destructive hover:text-destructive'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      )}
    </div>
  );
}
