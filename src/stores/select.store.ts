import { TodoData } from '@/types/todo.type'
import { create } from 'zustand'

type SelectState = {
  selectMode: boolean
  selectedTodos: string[]
  setSelectMode: (mode: boolean) => void
  handleSelectTodo: (id: string) => void
  handleSelectAll: (todos: TodoData[]) => void
  handleResetSelect: () => void
}

export const useSelectStore = create<SelectState>((set) => ({
  selectMode: false,
  selectedTodos: [],
  setSelectMode: (mode) => set({ selectMode: mode }),
  handleSelectTodo: (id) =>
    set((state) => ({
      selectedTodos: state.selectedTodos.includes(id)
        ? state.selectedTodos.filter((todoId) => todoId !== id)
        : [...state.selectedTodos, id]
    })),
  handleSelectAll: (todos) =>
    set((state) => ({
      selectedTodos: state.selectedTodos.length === todos.length ? [] : todos.map((todo) => todo.todo_id)
    })),
  handleResetSelect: () => set({ selectMode: false, selectedTodos: [] })
}))
