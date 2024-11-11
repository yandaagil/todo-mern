import { CreateTodo, UpdateTodo } from '@/types/todo.type'
import instance from '../lib/axios/instance'

const todoServices = {
  createTodo: (todo: CreateTodo) => instance.post('/todo', todo),
  fetchTodos: (search?: string) => instance.get('/todo', { params: { search } }),
  updateTodo: (id: string, todo: UpdateTodo) => instance.put(`/todo/${id}`, todo),
  deleteTodo: (id?: string, ids?: string[]) => instance.delete(`/todo/${id && id}`, { data: { ids } })
}

export default todoServices
