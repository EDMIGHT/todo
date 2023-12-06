import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type OverlayProps = HTMLAttributes<HTMLDivElement>;

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 h-screen w-screen flex items-center justify-center bg-black/80 backdrop-blur-sm',
          className
        )}
        {...rest}
      />
    );
  }
);
