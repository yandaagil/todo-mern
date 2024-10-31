import { TodoData } from '@/types/todo.type';
import { date } from '@/utils/date';
import { Button, Divider, Drawer, Tooltip } from 'antd';
import { AlignJustify } from 'lucide-react';
import React, { FC, useState } from 'react'

type DetailTodoProps = {
  todo: TodoData
}

const DetailTodo: FC<DetailTodoProps> = ({ todo }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title='Detail'>
        <Button
          type='text'
          shape='circle'
          icon={<AlignJustify size={16} />}
          onClick={() => setOpen(true)}
        />
      </Tooltip>

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
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-gray-700'>Created At</p>
          <p>{date(todo.createdAt)}</p>
        </div>
      </Drawer>
    </>
  );
}

export default DetailTodo