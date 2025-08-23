import { Card, CardContent } from '../card';
import { Button } from '../button';
import { AlertCircle } from 'lucide-react';

interface IErrorStateProps {
  title: string;
  description?: string;
  error: string;
  onRetry?: () => void;
}

export function ErrorState({ title, description, error, onRetry }: IErrorStateProps) {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 lg:text-3xl'>{title}</h1>
          {description && <p className='mt-2 text-gray-600'>{description}</p>}
        </div>
      </div>
      <Card className='border border-gray-200'>
        {' '}
        <CardContent className='p-6'>
          <div className='text-center'>
            <AlertCircle className='mx-auto mb-2 h-8 w-8 text-red-500' />
            <p className='mb-4 text-red-600'>{error}</p>
            {onRetry && (
              <Button onClick={onRetry} className='bg-blue-600 hover:bg-blue-700'>
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
