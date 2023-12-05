import { Todo } from '@prisma/client';

import prisma from '@/db/prisma';

type ICreateTodoArgs = Pick<Todo, 'title' | 'status'>;

export class TodoService {
  public static async getAll(title: string): Promise<Todo[]> {
    return prisma.todo.findMany({
      where: {
        title: {
          startsWith: title,
        },
      },
    });
  }
  public static async create({ title, status }: ICreateTodoArgs): Promise<Todo> {
    return prisma.todo.create({
      data: {
        title,
        status,
      },
    });
  }
}
