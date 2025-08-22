import { Card, CardContent } from '../card';

interface LoadingStateProps {
  title: string;
  description?: string;
}

export function LoadingState({ title, description }: LoadingStateProps) {
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
          <div className="text-center text-gray-500">Loading...</div>
        </CardContent>
      </Card>
    </div>
  );
}
