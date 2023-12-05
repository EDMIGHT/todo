import { FC } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

type TodoSkeletonsProps = {
  count?: number;
};

const TodoSkeletons: FC<TodoSkeletonsProps> = ({ count = 5 }) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <>
      {skeletonArray.map((_, i) => (
        <Skeleton key={i} className='w-full h-10' />
      ))}
    </>
  );
};

export default TodoSkeletons;
