import { FC } from 'react'
import { TodoData } from '@/types/todo.type'
import { useTodo } from '@/hooks/useTodo'
import Todo from './todo'

type CompletedTodoProps = {
  completedTodo: TodoData[]
}

const CompletedTodo: FC<CompletedTodoProps> = ({ completedTodo }) => {
  const { editMutation: { mutate } } = useTodo()

  const handleUpdate = (id: string, isCompleted: boolean) => {
    mutate({
      id,
      data: { isCompleted },
    });
  };

  return (
    <div className='space-y-3'>
      {completedTodo.length > 0 ? (
        completedTodo.map((todo: TodoData) => (
          <Todo key={todo.todo_id} todo={todo} onClick={() => handleUpdate(todo.todo_id, false)} />
        ))) : (
        <div className="flex items-center justify-center">
          <p className="text-gray-500">No completed todo</p>
        </div>
      )}
    </div>
  )
}

export default CompletedTodo