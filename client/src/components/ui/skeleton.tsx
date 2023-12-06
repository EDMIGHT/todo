import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton: FC<SkeletonProps> = ({ className, ...rest }) => {
  return <div {...rest} className={cn(`bg-muted rounded-xl animate-pulse`, className)} />;
};
