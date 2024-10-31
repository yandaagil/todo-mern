import { FC } from 'react'
import { TodoData } from '@/types/todo.type'
import { useTodo } from '@/hooks/useTodo'
import { Card, message } from 'antd'
import { Calendar, Check } from 'lucide-react'
import { date } from '@/utils/date'
import TodoAction from './todoAction'
import { useSelect } from '@/stores/select.store'
import { cn } from '@/lib/utils'
import { dueDate } from '@/helpers/todoDate'

type TodoProps = {
  todo: TodoData[]
}

const Todo: FC<TodoProps> = ({ todo }) => {
  const { updateMutation: { mutateAsync } } = useTodo()
  const { selectMode, handleSelectTodo, selectedTodos } = useSelect();

  const handleUpdate = async (id: string, isCompleted: boolean) => {
    try {
      await mutateAsync({
        id,
        data: { isCompleted },
      });
      message.success('Task updated successfully');
    } catch (error) {
      console.log(error);
      message.error('Failed to update task');
    }
  };

  return (
    <div className='space-y-3'>
      {todo.length > 0 ? (
        todo.map((todo: TodoData) => (
          <Card key={todo.todo_id} size='small' className='group'>
            <div className='flex flex-row justify-between'>
              <div className="flex gap-3">
                <button
                  className={cn("h-6 w-6 border-2 rounded-md inline-flex items-center justify-center text-white transition-colors",
                    {
                      "border-violet-700 bg-violet-700":
                        selectMode ? selectedTodos.includes(todo.todo_id) : todo.isCompleted,
                      "border-gray-200 hover:border-gray-300 hover:text-gray-500":
                        !(selectMode ? selectedTodos.includes(todo.todo_id) : todo.isCompleted)
                    }
                  )}
                  onClick={
                    selectMode
                      ? () => handleSelectTodo(todo.todo_id)
                      : () => handleUpdate(todo.todo_id, !todo.isCompleted)
                  }
                >
                  <Check size={14} />
                </button>
                <div className="flex flex-col gap-2">
                  <p className={cn(
                    "font-semibold",
                    { "line-through text-gray-500": todo.isCompleted }
                  )}>{todo.todo}</p>
                  <p className={cn('text-xs font-semibold flex gap-2 items-center text-gray-600',
                    {
                      'text-yellow-600': !todo.isCompleted && dueDate(todo.date) === 0,
                      'text-red-600': !todo.isCompleted && (dueDate(todo.date) === -1 || dueDate(todo.date) < -1)
                    }
                  )}>
                    <Calendar size={15} />
                    {date(todo.date)}
                  </p>
                </div>
              </div>
              {!selectMode && <TodoAction todo={todo} />}
            </div>
          </Card>
        ))) : (
        <div className="flex items-center justify-center">
          <p className="text-gray-500">No todos yet</p>
        </div>
      )}
    </div>
  )
}

export default Todo