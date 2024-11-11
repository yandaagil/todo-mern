import todoServices from '@/services/todo.service'
import { TodoData, UpdateTodo } from '@/types/todo.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useTodo = (search: string = '') => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['todos', { search: search }],
    queryFn: () => todoServices.fetchTodos(search),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data) => {
      const todos: TodoData[] = data.data.data || []
      const uncompletedTodo = todos.filter((todo) => !todo.isCompleted)
      const completedTodo = todos.filter((todo) => todo.isCompleted)

      return { todos, uncompletedTodo, completedTodo }
    }
  })

  const createMutation = useMutation({
    mutationFn: todoServices.createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodo }) => todoServices.updateTodo(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  })

  const deleteMutation = useMutation({
    mutationFn: ({ id, ids }: { id?: string; ids?: string[] }) => todoServices.deleteTodo(id, ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  })

  return {
    query,
    createMutation,
    updateMutation,
    deleteMutation
  }
}
