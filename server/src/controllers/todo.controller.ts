import { Request, Response } from 'express';

import { CustomResponse } from '@/lib/custom-response';
import { serverErrorResponse } from '@/lib/server-error-response';
import { TodoService } from '@/services/todo.service';
import { IRequestAllTodo } from '@/types/request';

export class TodoController {
  public static async getAllTodo(req: Request, res: Response): Promise<Response> {
    const { title = '' } = req.query as unknown as IRequestAllTodo;

    try {
      const allTodo = await TodoService.getAll(title);

      return CustomResponse.ok(res, allTodo);
    } catch (error) {
      return serverErrorResponse({
        res,
        message: 'error while fetching comics on server side',
        error,
      });
    }
  }
}
