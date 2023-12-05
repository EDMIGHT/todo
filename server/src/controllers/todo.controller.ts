import { Request, Response } from 'express';

import { CustomResponse } from '@/lib/custom-response';
import { serverErrorResponse } from '@/lib/server-error-response';
import { TodoService } from '@/services/todo.service';
import { IRequestAllToDos } from '@/types/request';

export class TodoController {
  public static async getAll(req: Request, res: Response): Promise<Response> {
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
  public static async create(req: Request, res: Response): Promise<Response> {
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
  public static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const existedTodo = await TodoService.getById(id);

      if (!existedTodo) {
        return CustomResponse.notFound(res, {
          message: `todo with id = ${id} not found`,
        });
      }

      const newTodo = await TodoService.update(id, req.body);

      return CustomResponse.ok(res, newTodo);
    } catch (error) {
      return serverErrorResponse({
        res,
        message: 'error when updating ToDo on the server side',
        error,
      });
    }
  }
  public static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const existedTodo = await TodoService.getById(id);

      if (!existedTodo) {
        return CustomResponse.notFound(res, {
          message: `todo with id = ${id} not found`,
        });
      }

      await TodoService.delete(id);

      return CustomResponse.ok(res, null);
    } catch (error) {
      return serverErrorResponse({
        res,
        message: 'error when deleting ToDo on the server side',
        error,
      });
    }
  }
}
