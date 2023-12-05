import { FC, HTMLAttributes } from 'react';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton: FC<SkeletonProps> = ({ className, ...rest }) => {
  return <div {...rest} className={`bg-muted rounded-xl animate-pulse ${className}`} />;
};
