export type TodoData = {
  todo_id: string;
  user_id: string;
  todo: string;
  date: string;
  isCompleted: boolean;
  createdAt: string;
};

export type CreateTodo = {
  user_id: string;
  todo: string;
  date: string;
  isCompleted: boolean;
};

export type UpdateTodo = {
  todo?: string;
  date?: string;
  isCompleted?: boolean;
};
