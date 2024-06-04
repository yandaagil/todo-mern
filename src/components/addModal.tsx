import { Plus } from 'lucide-react';
import React, { FC, useRef, useState } from 'react'
import todoServices from '../services/service';

const AddModal: FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeModal = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const handleAdd = async () => {
    await todoServices.addTodo({
      todo_id: '',
      todo: todo,
      date: date,
      isCompleted: false
    })
      .then(() => {
        setTodo('')
        setDate('')
        closeModal()
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <button
        className="px-3 h-9 bg-blue-700 text-white rounded-lg inline-flex gap-2 items-center justify-center font-medium transition-colors hover:bg-blue-700/90"
        onClick={openModal}
      >
        <Plus size={18} />
        <span>New Task</span>
      </button>
      <dialog ref={dialogRef}>
        <div className='container bg-white border border-gray-200 shadow-sm rounded-lg p-4 flex flex-col space-y-5 fixed top-[25%] left-[50%] translate-x-[-50%] translate-y-[-25%] md:max-w-lg'>
          <h2 className='font-semibold'>New Task</h2>
          <div className='flex flex-col space-y-3'>
            <input
              type="text"
              name="todo"
              id="todo"
              placeholder="What you're gonna do?"
              className='p-2 rounded-lg border-2 border-gray-200 transition-colors hover:border-gray-400'
              onChange={(e) => setTodo(e.target.value)}
              required
            />
            <input
              type="date"
              name="date"
              id="date"
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
              className="px-3 h-9 bg-blue-700 text-white rounded-lg inline-flex items-center justify-center font-medium transition-colors hover:bg-blue-700/90"
              onClick={handleAdd}
            >
              <span>Add</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default AddModal