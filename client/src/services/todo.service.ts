import { api } from '@/services/api';
import { ITodo } from '@/types/todo';

type IGetAllTodoArgs = {
  title?: string;
};

export class TodoService {
  public static async getAll({ title = '' }: IGetAllTodoArgs) {
    const { data } = await api.get<ITodo[]>(`?title=${title}`);
    return data;
  }
  public static async delete(id: string) {
    const { data } = await api.delete<null>(`/${id}`);
    return data;
  }
}
