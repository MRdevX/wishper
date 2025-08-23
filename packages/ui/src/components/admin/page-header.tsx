import { Button } from '../button';
import { LucideIcon } from 'lucide-react';

interface IPageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
    href?: string;
  };
}

export function PageHeader({ title, description, action }: IPageHeaderProps) {
  const ActionButton = () => {
    if (!action) return null;

    const Icon = action.icon;
    const buttonContent = (
      <>
        {Icon && <Icon className='mr-2 h-4 w-4' />}
        {action.label}
      </>
    );

    if (action.href) {
      return (
        <Button asChild className='bg-blue-600 hover:bg-blue-700'>
          <a href={action.href}>{buttonContent}</a>
        </Button>
      );
    }

    return (
      <Button className='bg-blue-600 hover:bg-blue-700' onClick={action.onClick}>
        {buttonContent}
      </Button>
    );
  };

  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900 lg:text-3xl'>{title}</h1>
        {description && <p className='mt-2 text-gray-600'>{description}</p>}
      </div>
      <ActionButton />
    </div>
  );
}
