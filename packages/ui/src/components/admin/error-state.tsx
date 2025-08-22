import { Card, CardContent } from '../card';
import { Button } from '../button';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  description?: string;
  error: string;
  onRetry?: () => void;
}

export function ErrorState({ title, description, error, onRetry }: ErrorStateProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-gray-600 mt-2">{description}</p>}
        </div>
      </div>
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-600 mb-4">{error}</p>
            {onRetry && (
              <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
