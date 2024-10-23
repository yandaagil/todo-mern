export type TodoData = {
  todo_id: string;
  todo: string;
  date: string;
  isCompleted: boolean;
};

export type UpdateTodo = {
  todo?: string;
  date?: string;
  isCompleted?: boolean;
};
