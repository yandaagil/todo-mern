import React, { FC, useEffect, useState } from 'react';
import { Button, DatePicker, Input, Modal, message } from 'antd';
import { Edit } from 'lucide-react';
import { TodoData } from '@/types/todo.type';
import dayjs, { Dayjs } from 'dayjs';
import { useTodo } from '@/hooks/useTodo';

interface EditModalProps {
  todo?: TodoData;
}

interface FormState {
  task: string;
  date: string | null;
}

const EditModal: FC<EditModalProps> = ({ todo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    task: '',
    date: null,
  });
  const { editMutation: { mutate, isPending, isSuccess } } = useTodo();

  const resetForm = () => {
    setForm({ task: '', date: null });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setForm(prev => ({
      ...prev,
      date: date ? date.format('YYYY-MM-DD') : null,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      task: e.target.value,
    }));
  };

  const handleUpdate = () => {
    if (!todo?.todo_id || !form.task || !form.date) {
      message.warning('Please fill in all required fields');
      return;
    }

    mutate({
      id: todo.todo_id,
      data: { todo: form.task, date: form.date, isCompleted: todo.isCompleted },
    });

    if (isSuccess) {
      setIsOpen(false);
      resetForm();
    }
  };

  useEffect(() => {
    if (todo) {
      setForm({
        task: todo.todo || '',
        date: todo.date ? dayjs(todo.date).format('YYYY-MM-DD') : null,
      });
    }
  }, [todo]);

  return (
    <>
      <Button
        shape="circle"
        className='hidden group-hover:block'
        icon={<Edit size={16} />}
        onClick={() => setIsOpen(true)}
      />

      <Modal
        title="Edit Todo"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        destroyOnClose
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>,
          <Button
            key="update"
            type="primary"
            onClick={handleUpdate}
            loading={isPending}
            disabled={!form.task || !form.date}
          >
            {isPending ? 'Updating...' : 'Update'}
          </Button>,
        ]}
      >
        <div className="space-y-3">
          <div className='space-y-1'>
            <label htmlFor="todo">Task</label>
            <Input
              type="text"
              id="todo"
              value={form.task}
              placeholder="What you're gonna do?"
              onChange={handleInputChange}
              disabled={isPending}
              required
            />
          </div>
          <div className='space-y-1'>
            <label htmlFor="date">Date</label>
            <DatePicker
              id="date"
              value={form.date ? dayjs(form.date) : null}
              className="w-full"
              onChange={handleDateChange}
              disabled={isPending}
              required
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditModal;