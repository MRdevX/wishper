import { Button } from '../button';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
    href?: string;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  const ActionButton = () => {
    if (!action) return null;

    const Icon = action.icon;
    const buttonContent = (
      <>
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {action.label}
      </>
    );

    if (action.href) {
      return (
        <a href={action.href}>
          <Button className="bg-blue-600 hover:bg-blue-700">
            {buttonContent}
          </Button>
        </a>
      );
    }

    return (
      <Button 
        className="bg-blue-600 hover:bg-blue-700"
        onClick={action.onClick}
      >
        {buttonContent}
      </Button>
    );
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
      <ActionButton />
    </div>
  );
}
