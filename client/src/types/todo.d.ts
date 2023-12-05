export type ITodo = {
  id: string;
  title: string;
  status: boolean;
  createdAt: string;
};

export type ITodoCommonFields = Pick<ITodo, 'title' | 'status'>;
