import React, { FC, useEffect, useState } from 'react'
import { Check, Calendar } from 'lucide-react'
import EditModal from './editModal'
import DeleteModal from './deleteModal'
import { Todo } from '@/types/type'
import todoServices from '@/services/service'
import { date } from '@/utils/dateFormat'

type Props = {
  uncompletedTodo: Todo[]
}

const UncompletedTodo: FC<Props> = ({ uncompletedTodo }) => {
  const handleEdit = async (id: string) => {
    await todoServices.updateTodoCheck(id, { isCompleted: true })
      .then(() => window.location.reload())
      .catch(err => console.log(err))
  }

  return (
    <>
      {uncompletedTodo.length > 0 ? (
        uncompletedTodo.map((todo: Todo) => (
          <div key={todo.date} className="p-4 rounded-lg border border-gray-200 shadow-sm flex flex-row justify-between transition-colors group hover:bg-[#f5f5f5]">
            <div className="flex gap-3">
              <button
                className="h-6 w-6 border-2 border-gray-200 text-white rounded-md inline-flex gap-2 items-center justify-center font-medium transition-colors hover:text-gray-500"
                onClick={() => handleEdit(todo.todo_id)}
              >
                <Check size={14} />
              </button>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">{todo.todo}</p>
                <p className="text-xs text-gray-600 font-semibold flex gap-2 items-center">
                  <Calendar size={15} />
                  {date(todo.date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <EditModal todo={todo} />
              <DeleteModal todo={todo} />
            </div>
          </div>
        ))) : (
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-gray-500">No todo left</p>
        </div>
      )}
    </>
  )
}

export default UncompletedTodo