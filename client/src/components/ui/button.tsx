import { ButtonHTMLAttributes, FC } from 'react';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export const Button: FC<ButtonProps> = ({ className, isLoading, children, ...rest }) => {
  return (
    <button
      className={cn(
        'h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      disabled={isLoading}
      {...rest}
    >
      {isLoading && <Icons.loading className='mr-2 h-4 w-4 animate-spin' />}
      {children}
    </button>
  );
};
