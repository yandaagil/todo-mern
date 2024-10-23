import React, { FC, useState } from 'react';
import { Button, Card, Modal } from 'antd';
import { Calendar, Trash } from 'lucide-react';
import { TodoData } from '@/types/todo.type';
import { date } from '@/utils/dateFormat';
import { useTodo } from '@/hooks/useTodo';

interface DeleteModalProps {
  todo?: TodoData;
}

const DeleteModal: FC<DeleteModalProps> = ({ todo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteMutation: { mutate, isPending, isSuccess } } = useTodo();

  const handleDelete = () => {
    if (todo?.todo_id) {
      mutate(todo.todo_id);
      if (isSuccess) setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        shape="circle"
        type="default"
        color='danger'
        variant='outlined'
        className='hidden group-hover:block'
        icon={<Trash size={16} />}
        onClick={() => setIsOpen(true)}
      />

      <Modal
        title="Delete Todo"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>,
          <Button
            key="delete"
            color='danger'
            variant='outlined'
            onClick={handleDelete}
            loading={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>,
        ]}
      >
        <Card size='small'>
          <div className='space-y-2'>
            <p className="font-semibold">{todo?.todo}</p>
            <p className="text-xs text-gray-600 font-semibold flex items-center gap-2">
              <Calendar size={15} />
              {date(todo?.date ?? '')}
            </p>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default DeleteModal;