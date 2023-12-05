import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import TodoSkeletons from '@/components/skeletons/todo-skeletons';
import { useSearchParams } from '@/hooks/use-search-params';
import { QUERY_KEYS } from '@/lib/constants';
import { TodoService } from '@/services/todo.service';

export const TodosList: FC = () => {
  const title = useSearchParams('title');

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.todo, title],
    queryFn: async () => {
      return await TodoService.getAll({ title });
    },
  });

  return (
    <ul className='flex flex-col gap-2'>
      {isSuccess &&
        data.map(({ id, title }) => (
          <li
            key={id}
            className='py-1 px-2 text-lg border-border border rounded-md font-medium'
          >
            {title}
          </li>
        ))}
      {isLoading && <TodoSkeletons />}
    </ul>
  );
};
