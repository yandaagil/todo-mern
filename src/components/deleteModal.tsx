import React, { FC, useState } from 'react';
import { Button, Card, Modal, Tooltip, message } from 'antd';
import { Calendar, Trash } from 'lucide-react';
import { TodoData } from '@/types/todo.type';
import { date } from '@/utils/date';
import { useTodo } from '@/hooks/useTodo';

interface DeleteModalProps {
  todo?: TodoData;
}

const DeleteModal: FC<DeleteModalProps> = ({ todo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteMutation: { mutateAsync, isPending } } = useTodo();

  const handleDelete = async () => {
    if (!todo?.todo_id) {
      message.warning('Task does not exist');
      return
    }

    try {
      await mutateAsync({ id: todo.todo_id });
      message.success('Task deleted successfully');
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      message.error('Failed to delete task');
    }
  };

  return (
    <>
      <Tooltip title='Delete'>
        <Button
          type='text'
          shape='circle'
          icon={<Trash size={16} color='red' />}
          onClick={() => setIsOpen(true)}
        />
      </Tooltip>

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