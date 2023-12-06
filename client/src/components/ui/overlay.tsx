import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type OverlayProps = HTMLAttributes<HTMLDivElement>;

export const Overlay: FC<OverlayProps> = ({ className, ...rest }) => {
  return (
    <div
      className={cn(
        'fixed inset-0 h-screen w-screen flex items-center justify-center bg-black/80 backdrop-blur-sm',
        className
      )}
      {...rest}
    />
  );
};
