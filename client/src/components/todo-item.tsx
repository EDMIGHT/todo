import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';

import { Icons } from '@/components/ui/icons';
import { QUERY_KEYS } from '@/lib/constants';
import { TodoService } from '@/services/todo.service';
import { ITodo } from '@/types/todo';

export const TodoItem: FC<ITodo> = ({ id, title }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.todo],
    mutationFn: async () => {
      return await TodoService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.todo],
      });
    },
  });

  return (
    <li className='py-1 px-2 text-lg border-border border rounded-md font-medium flex gap-2 items-center justify-between'>
      <span className='line-clamp-1'>{title}</span>

      <button
        className='group'
        disabled={isPending}
        onClick={() => {
          deleteTodo();
        }}
      >
        {isPending ? (
          <Icons.loading className='md:h-7 md:w-7 h-5 w-5 animate-spin' />
        ) : (
          <Icons.x className='md:h-7 md:w-7 h-5 w-5  cursor-pointer transition stroke-destructive group-hover:brightness-75' />
        )}
      </button>
    </li>
  );
};
