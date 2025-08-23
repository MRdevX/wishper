import { Card, CardContent } from '../card';

interface LoadingStateProps {
  title: string;
  description?: string;
}

export function LoadingState({ title, description }: LoadingStateProps) {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 lg:text-3xl'>{title}</h1>
          {description && <p className='mt-2 text-gray-600'>{description}</p>}
        </div>
      </div>
      <Card className='border-gray-200'>
        <CardContent className='p-6'>
          <div className='text-center text-gray-500'>Loading...</div>
        </CardContent>
      </Card>
    </div>
  );
}
