import { Todo } from '@prisma/client';

export type IRequestAllTodo = {
  title: Todo['title'];
};
