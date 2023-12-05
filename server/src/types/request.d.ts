import { Todo } from '@prisma/client';

export type IRequestAllToDos = {
  title: Todo['title'];
};
