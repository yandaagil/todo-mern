import { TodoData } from '@/types/todo.type';
import { date } from '@/utils/dateFormat';
import { Card, Divider, Drawer } from 'antd';
import { Calendar, Check } from 'lucide-react';
import React, { FC, useState } from 'react'
import EditModal from './editModal';
import DeleteModal from './deleteModal';

type TodoProps = {
  todo: TodoData
  onClick: () => void
}

const Todo: FC<TodoProps> = ({ todo, onClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card size='small' className='group' onClick={() => setOpen(true)} hoverable>
        <div className='flex flex-row justify-between'>
          <div className="flex gap-3">
            <button
              className={`h-6 w-6 border-2 text-white rounded-md inline-flex gap-2 items-center justify-center font-medium 
                ${todo.isCompleted ? 'border-violet-700 bg-violet-700' : 'border-gray-200 transition-colors hover:text-gray-500'}`}
              onClick={onClick}
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
          <div className="flex items-center gap-2">
            <EditModal todo={todo} />
            <DeleteModal todo={todo} />
          </div>
        </div>
      </Card>
      <Drawer title="Detail" onClose={() => setOpen(false)} open={open}>
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-gray-700'>Todo</p>
          <p>{todo.todo}</p>
        </div>
        <Divider />
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-gray-700'>Status</p>
          <p>{todo.isCompleted ? 'Completed' : 'Uncompleted'}</p>
        </div>
        <Divider />
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-gray-700'>Date</p>
          <p>{date(todo.date)}</p>
        </div>
        <Divider />
      </Drawer>
    </>
  );
}

export default Todo