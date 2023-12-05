import { Request, Response } from 'express';

import { CustomResponse } from '@/lib/custom-response';
import { serverErrorResponse } from '@/lib/server-error-response';
import { TodoService } from '@/services/todo.service';
import { IRequestAllToDos } from '@/types/request';

export class TodoController {
  public static async getToDos(req: Request, res: Response): Promise<Response> {
    const { title = '' } = req.query as unknown as IRequestAllToDos;

    try {
      const allTodo = await TodoService.getAll(title);

      return CustomResponse.ok(res, allTodo);
    } catch (error) {
      return serverErrorResponse({
        res,
        message: 'error when receiving ToDos on the server side',
        error,
      });
    }
  }
  public static async createTodo(req: Request, res: Response): Promise<Response> {
    try {
      const newTodo = await TodoService.create(req.body);

      return CustomResponse.created(res, newTodo);
    } catch (error) {
      return serverErrorResponse({
        res,
        message: 'error when creating ToDo on the server side',
        error,
      });
    }
  }
}
