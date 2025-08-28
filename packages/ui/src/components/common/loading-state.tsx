interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = 'Loading...', className = '' }: LoadingStateProps) {
  return (
    <div className={`flex h-64 items-center justify-center ${className}`}>
      <div className='text-slate-600'>{message}</div>
    </div>
  );
}
