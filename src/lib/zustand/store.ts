import { create } from "zustand";
import { Todo } from "@/types/type";

type State = {
  uncompletedTodo: Todo[] | [];
  completedTodo: Todo[] | [];
};

type Action = {
  updateUncompletedTodo: (uncompletedTodo: State["uncompletedTodo"]) => void;
  updateCompletedTodo: (completedTodo: State["completedTodo"]) => void;
};

const useTodoStore = create<State & Action>((set) => ({
  uncompletedTodo: [],
  completedTodo: [],
  updateUncompletedTodo: (uncompletedTodo) =>
    set(() => ({ uncompletedTodo: uncompletedTodo })),
  updateCompletedTodo: (completedTodo) =>
    set(() => ({ completedTodo: completedTodo })),
}));

export default useTodoStore;
