import { api } from '@/services/api';
import { ITodo, ITodoCommonFields } from '@/types/todo';

export class TodoService {
  public static async getAll(title: Partial<ITodo['title']> = '') {
    const { data } = await api.get<ITodo[]>(`?title=${title}`);
    return data;
  }
  public static async create(title: ITodo['title']) {
    const { data } = await api.post<ITodo>('/', {
      title,
    });
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
