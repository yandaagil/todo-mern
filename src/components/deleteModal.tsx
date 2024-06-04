import todoServices from '@/services/service';
import { Todo } from '@/types/type';
import { date } from '@/utils/dateFormat';
import { Calendar, Trash } from 'lucide-react';
import React, { FC, useRef } from 'react'

type Props = {
  todo?: Todo
}

const DeleteModal: FC<Props> = ({ todo }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeModal = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const handleDelete = async (id: string) => {
    await todoServices.deleteTodo(id)
      .then(() => {
        closeModal()
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <button
        className="mr-2 text-gray-400 rounded-lg hidden gap-2 items-center justify-center font-medium transition-colors hover:text-red-700 group-hover:inline-flex"
        onClick={openModal}
      >
        <Trash size={18} />
      </button>
      <dialog ref={dialogRef}>
        <div className='container bg-white border border-gray-200 shadow-sm rounded-lg p-4 flex flex-col space-y-5 fixed top-[25%] left-[50%] translate-x-[-50%] translate-y-[-25%] md:max-w-lg'>
          <h2 className='font-semibold'>Delete this task?</h2>
          <div className="p-4 rounded-lg border border-gray-200 shadow-sm flex flex-row justify-between transition-colors group">
            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                <p className="font-semibold">{todo?.todo}</p>
                <p className="text-xs text-gray-600 font-semibold flex gap-2 items-center">
                  <Calendar size={15} />
                  {date(todo?.date || '')}
                </p>
              </div>
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <button
              className="px-3 h-9 border border-gray-200 shadow-sm rounded-lg inline-flex items-center justify-center font-medium transition-colors hover:bg-[#f5f5f5]"
              onClick={closeModal}
            >
              <span>Cancel</span>
            </button>
            <button
              className="px-3 h-9 bg-red-700 text-white rounded-lg inline-flex items-center justify-center font-medium transition-colors hover:bg-red-700/90"
              onClick={() => handleDelete(todo?.todo_id || '')}
            >
              <span>Confirm</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default DeleteModal