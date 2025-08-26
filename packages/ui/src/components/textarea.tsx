import * as React from 'react';
import { cn } from '@repo/ui/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'resize-vertical flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
