import { FC } from 'react'
import { TodoData } from '@/types/todo.type'
import { useTodo } from '@/hooks/useTodo'
import Todo from './todo'

type UncompletedTodoProps = {
  uncompletedTodo: TodoData[]
}

const UncompletedTodo: FC<UncompletedTodoProps> = ({ uncompletedTodo }) => {
  const { editMutation: { mutate } } = useTodo()

  const handleUpdate = (id: string, isCompleted: boolean) => {
    mutate({
      id,
      data: { isCompleted },
    });
  };

  return (
    <div className='space-y-3'>
      {uncompletedTodo.length > 0 ? (
        uncompletedTodo.map((todo: TodoData) => (
          <Todo key={todo.todo_id} todo={todo} onClick={() => handleUpdate(todo.todo_id, true)} />
        ))) : (
        <div className="flex items-center justify-center">
          <p className="text-gray-500">No todo left</p>
        </div>
      )}
    </div>
  )
}

export default UncompletedTodo