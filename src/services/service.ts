import { Todo, UpdateTodo } from "@/types/type";
import instance from "../lib/axios/instance";

const todoServices = {
  addTodo: (todo: Todo) => instance.post("/todo", todo),
  getTodos: () => instance.get("/todo"),
  updateTodo: (id: string, todo: UpdateTodo) =>
    instance.put(`/todo/${id}`, todo),
  deleteTodo: (id: string) => instance.delete(`/todo/${id}`),
};

export default todoServices;
