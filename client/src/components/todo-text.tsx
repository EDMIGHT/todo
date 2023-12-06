import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { QUERY_KEYS } from '@/lib/constants';
import { handlerQueryValidationError } from '@/lib/handle-errors';
import { TodoService } from '@/services/todo.service';
import { ITodo } from '@/types/todo';

type TodoTextProps = Pick<ITodo, 'id' | 'title'>;

export const TodoText: FC<TodoTextProps> = ({ id, title }) => {
  const queryClient = useQueryClient();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editModeTextValue, setEditModeTextValue] = useState(title);

  const { mutate: updateTitle, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.todo],
    mutationFn: async () => {
      return await TodoService.update(id, {
        title: editModeTextValue,
      });
    },
    onSuccess: () => {
      setIsEditMode(false);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.todo],
      });
    },
    onError: (err) => {
      handlerQueryValidationError(err);
    },
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef && wrapperRef.current && !e.composedPath().includes(wrapperRef.current)) {
        setEditModeTextValue(title);
        setIsEditMode(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [title]);

  useEffect(() => {
    if (isEditMode && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const handleChangeText = (text: string) => {
    setEditModeTextValue(text);
  };

  const handleKeyDownOnInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (editModeTextValue.length < 2 || editModeTextValue.length > 190) {
      return toast.error('Validation error', {
        description: 'The title must be at least 2 characters and no more than 190',
      });
    }

    updateTitle();
  };

  return (
    <div ref={wrapperRef} className='w-full'>
      {!isPending ? (
        <button
          onClick={() => {
            if (!isEditMode) {
              setIsEditMode(true);
            }
          }}
          className='w-full text-start'
          disabled={isPending}
        >
          {isEditMode ? (
            <Input
              ref={inputRef}
              value={editModeTextValue}
              onChange={(e) => {
                handleChangeText(e.target.value);
              }}
              onKeyDown={handleKeyDownOnInput}
              placeholder='task title..'
              className='w-full border-b-2'
            />
          ) : (
            <h2 className='line-clamp-1'>{title}</h2>
          )}
        </button>
      ) : (
        <Skeleton className='w-full h-7' />
      )}
    </div>
  );
};
