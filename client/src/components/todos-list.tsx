import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import TodoSkeletons from '@/components/skeletons/todo-skeletons';
import { TodoItem } from '@/components/todo-item';
import { useSearchParams } from '@/hooks/use-search-params';
import { QUERY_KEYS } from '@/lib/constants';
import { TodoService } from '@/services/todo.service';

export const TodosList: FC = () => {
  const title = useSearchParams('title');
  const [parent] = useAutoAnimate();

  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: [QUERY_KEYS.todo, title],
    queryFn: async () => {
      return await TodoService.getAll({ title });
    },
  });

  return (
    <ul ref={parent} className='flex flex-col gap-2'>
      {isSuccess && data.map((todo) => <TodoItem key={todo.id} {...todo} />)}
      {isLoading && <TodoSkeletons />}
      {isError && (
        <li className='flex flex-col justify-center items-center gap-1 h-32'>
          <p className='text-base md:text-lg'>Something went wrong</p>
          <button
            onClick={() => {
              refetch();
            }}
            className='font-semibold hover:opacity-75 transition-opacity'
          >
            Refetch
          </button>
        </li>
      )}
    </ul>
  );
};
