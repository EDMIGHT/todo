import { Todo } from '@prisma/client';

import prisma from '@/db/prisma';

type ICommonTodoArgs = Pick<Todo, 'title' | 'status'>;

export class TodoService {
  public static async getById(id: Todo['id']): Promise<Todo | null> {
    return prisma.todo.findFirst({
      where: {
        id,
      },
    });
  }
  public static async getAll(title: Todo['title']): Promise<Todo[]> {
    return prisma.todo.findMany({
      where: {
        title: {
          startsWith: title,
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  public static async create({ title, status }: ICommonTodoArgs): Promise<Todo> {
    return prisma.todo.create({
      data: {
        title,
        status,
      },
    });
  }
  public static async update(
    id: Todo['id'],
    { title, status }: ICommonTodoArgs
  ): Promise<Todo> {
    return prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        status,
      },
    });
  }
  public static delete(id: Todo['id']): Promise<Todo> {
    return prisma.todo.delete({
      where: {
        id,
      },
    });
  }
}
