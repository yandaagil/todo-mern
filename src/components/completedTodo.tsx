import React, { FC } from 'react'
import { Check } from 'lucide-react'
import EditModal from './editModal'
import DeleteModal from './deleteModal'
import { Todo } from '@/types/type'
import todoServices from '@/services/service'

type Props = {
  completedTodo: Todo[]
}

const CompletedTodo: FC<Props> = ({ completedTodo }) => {
  const handleEdit = async (id: string) => {
    await todoServices.updateTodoCheck(id, { isCompleted: false })
      .then(() => window.location.reload())
      .catch(err => console.log(err))
  }

  return (
    <>
      {completedTodo.length > 0 ? (
        completedTodo.map((todo: Todo) => (
          <div key={todo.date} className="p-4 rounded-lg border border-gray-200 bg-gray-50 shadow-sm flex flex-row justify-between opacity-70 group">
            <div className="flex gap-3">
              <button
                className="h-6 w-6 border-2 border-violet-700 bg-violet-700 text-white rounded-md inline-flex gap-2 items-center justify-center font-medium"
                onClick={() => handleEdit(todo.todo_id)}
              >
                <Check size={14} />
              </button>
              <p className="font-semibold line-through text-gray-700">{todo.todo}</p>
            </div>
            <div className="flex items-center gap-5">
              <EditModal todo={todo} />
              <DeleteModal todo={todo} />
            </div>
          </div>
        ))) : (
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-gray-500">No completed todo</p>
        </div>
      )}
    </>
  )
}

export default CompletedTodo