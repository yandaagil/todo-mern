import todoServices from "@/services/service";
import { UpdateTodo } from "@/types/todo.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useTodo = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["todos"],
    queryFn: todoServices.getTodos,
  });

  const handleSuccess = (msg: string) => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    message.success(msg);
  };

  const handleError = (msg: string) => (error: unknown) => {
    console.error(msg, error);
    message.error(msg);
  };

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodo }) =>
      todoServices.updateTodo(id, data),
    onSuccess: () => handleSuccess("Task updated successfully!"),
    onError: handleError("Failed to update task"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => todoServices.deleteTodo(id),
    onSuccess: () => handleSuccess("Task deleted successfully!"),
    onError: handleError("Failed to delete task"),
  });

  return {
    query,
    editMutation,
    deleteMutation,
  };
};
