import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Overlay } from '@/components/ui/overlay';
import { useClickOutside } from '@/hooks/use-click-outside';
import { QUERY_KEYS } from '@/lib/constants';
import { handlerQueryValidationError } from '@/lib/handle-errors';
import { checkTodoTitle } from '@/lib/validations/todo.validations';
import { TodoService } from '@/services/todo.service';

export const CreateTodo: FC = () => {
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const reset = () => {
    setInputValue('');
    setIsCreateMode(false);
  };

  const { mutate: createTodo, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.todo],
    mutationFn: async () => {
      return await TodoService.create(inputValue);
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.todo],
      });
    },
    onError: (err) => {
      handlerQueryValidationError(err);
    },
  });

  useClickOutside(modalRef, () => {
    reset();
  });

  const handleCreateTodo = () => {
    if (checkTodoTitle(inputValue)) {
      return toast.error('Validation error', {
        description: 'The title must be at least 2 characters and no more than 190',
      });
    }

    createTodo();
  };

  return (
    <>
      <button
        onClick={() => {
          setIsCreateMode(true);
        }}
        className='group'
      >
        <Icons.plus className='w-7 h-7 group-hover:stroke-primary/70 transition' />
      </button>

      {isCreateMode &&
        createPortal(
          <Overlay>
            <div
              ref={modalRef}
              className='fixed left-1/2 rounded-md top-1/3 flex w-[90vw] font-poppins -translate-x-1/2 flex-col gap-2 sm:w-[500px] max-w-md space-y-2 bg-background p-6'
            >
              <Input
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                className='w-full px-2 py-1 border-b-2'
                placeholder='todo title...'
              />
              <Button
                className='w-fit ml-auto'
                isLoading={isPending}
                onClick={() => {
                  handleCreateTodo();
                }}
              >
                Create
              </Button>
            </div>
          </Overlay>,
          document.body
        )}
    </>
  );
};
