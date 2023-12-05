import { api } from '@/services/api';
import { ITodo, ITodoCommonFields } from '@/types/todo';

type IGetAllTodoArgs = {
  title?: string;
};

export class TodoService {
  public static async getAll({ title = '' }: IGetAllTodoArgs) {
    const { data } = await api.get<ITodo[]>(`?title=${title}`);
    return data;
  }
  public static async update(id: string, payload: Partial<ITodoCommonFields>) {
    const { data } = await api.patch<ITodo>(`/${id}`, payload);
    return data;
  }
  public static async delete(id: string) {
    const { data } = await api.delete<null>(`/${id}`);
    return data;
  }
}
