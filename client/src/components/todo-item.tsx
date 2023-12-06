import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';

import { TodoText } from '@/components/todo-text';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { QUERY_KEYS } from '@/lib/constants';
import { handlerQueryError } from '@/lib/handle-errors';
import { TodoService } from '@/services/todo.service';
import { ITodo } from '@/types/todo';

export const TodoItem: FC<ITodo> = ({ id, title, status }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo, isPending: isDeletePending } = useMutation({
    mutationKey: [QUERY_KEYS.todo],
    mutationFn: async () => {
      return await TodoService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.todo],
      });
    },
    onError: (err) => {
      handlerQueryError(err);
    },
  });

  const { mutate: toggleCheck, isPending: isToggleCheckPending } = useMutation({
    mutationKey: [QUERY_KEYS.todo],
    mutationFn: async (checked: boolean) => {
      return await TodoService.update(id, {
        status: checked,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.todo],
      });
    },
    onError: (err) => {
      handlerQueryError(err);
    },
  });

  return (
    <li className='py-1 px-2 text-lg border-border border rounded-md font-medium flex gap-2 items-center justify-between'>
      <div className='flex gap-2 md:gap-4 items-center w-full'>
        {isToggleCheckPending ? (
          <Icons.loading className='md:h-7 md:w-7 h-5 w-5 animate-spin' />
        ) : (
          <Checkbox
            id={id}
            checked={status}
            onChange={(e) => {
              toggleCheck(e.target.checked);
            }}
          />
        )}
        <TodoText id={id} title={title} />
      </div>

      <button
        className='group'
        disabled={isDeletePending}
        onClick={() => {
          deleteTodo();
        }}
      >
        {isDeletePending ? (
          <Icons.loading className='md:h-7 md:w-7 h-5 w-5 animate-spin' />
        ) : (
          <Icons.x className='md:h-7 md:w-7 h-5 w-5  cursor-pointer transition stroke-destructive group-hover:brightness-75' />
        )}
      </button>
    </li>
  );
};
