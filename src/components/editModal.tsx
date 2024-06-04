import todoServices from '@/services/service';
import { Todo } from '@/types/type';
import { Edit } from 'lucide-react';
import React, { FC, useEffect, useRef, useState } from 'react'

type Props = {
  todo?: Todo
}

const EditModal: FC<Props> = ({ todo }) => {
  const [task, setTask] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeModal = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const handleUpdate = async (id: string) => {
    await todoServices.updateTodo(id, { todo: task, date: date })
      .then(() => {
        setTask('')
        setDate('')
        closeModal()
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (todo?.date) {
      const dbDate = new Date(todo.date);
      const formattedDate = dbDate.toISOString().split('T')[0];
      setDate(formattedDate);
    }

    if (todo?.todo) setTask(todo.todo);
  }, [todo]);

  return (
    <>
      <button
        className="text-gray-400 rounded-lg hidden gap-2 items-center justify-center font-medium transition-colors hover:text-gray-900 group-hover:inline-flex"
        onClick={openModal}
      >
        <Edit size={18} />
      </button>
      <dialog ref={dialogRef}>
        <div className='container bg-white border border-gray-200 shadow-sm rounded-lg p-4 flex flex-col space-y-5 fixed top-[25%] left-[50%] translate-x-[-50%] translate-y-[-25%] md:max-w-lg'>
          <h2 className='font-semibold'>Edit Task</h2>
          <div className='flex flex-col space-y-3'>
            <input
              type="text"
              name="todo"
              id="todo"
              placeholder="What you're gonna do?"
              defaultValue={todo?.todo}
              className='p-2 rounded-lg border-2 border-gray-200 transition-colors hover:border-gray-400'
              onChange={(e) => setTask(e.target.value)}
              required
            />
            <input
              type="date"
              name="date"
              id="date"
              defaultValue={date}
              className='p-2 rounded-lg border-2 border-gray-200 transition-colors hover:border-gray-400'
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className='flex justify-end gap-2'>
            <button
              className="px-3 h-9 border border-gray-200 shadow-sm rounded-lg inline-flex items-center justify-center font-medium transition-colors hover:bg-[#f5f5f5]"
              onClick={closeModal}
            >
              <span>Cancel</span>
            </button>
            <button
              className="px-3 h-9 bg-green-700 text-white rounded-lg inline-flex items-center justify-center font-medium transition-colors hover:bg-green-700/90"
              onClick={() => handleUpdate(todo?.todo_id || '')}
            >
              <span>Update</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default EditModal