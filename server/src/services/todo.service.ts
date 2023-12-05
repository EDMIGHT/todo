import { Todo } from '@prisma/client';

import prisma from '@/db/prisma';

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
}
