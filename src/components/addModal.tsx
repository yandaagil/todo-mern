import React, { FC, useState } from 'react';
import { Button, DatePicker, Input, Modal, message } from 'antd';
import { Plus } from 'lucide-react';
import { Dayjs } from 'dayjs';
import { useTodo } from '@/hooks/useTodo';
import { useSession } from 'next-auth/react';

interface FormState {
  todo: string;
  date: string | null;
}

const AddModal: FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    todo: '',
    date: null,
  });
  const { createMutation: { mutateAsync, isPending } } = useTodo();

  const resetForm = () => {
    setForm({ todo: '', date: null });
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
      todo: e.target.value,
    }));
  };

  const handleAdd = async () => {
    if (!form.todo || !form.date || !session) {
      message.warning('Please fill in all required fields');
      return;
    }

    try {
      await mutateAsync({
        user_id: session.user.id,
        todo: form.todo,
        date: form.date,
        isCompleted: false,
      });
      message.success('Task added successfully');
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.log(error);
      message.error('Failed to add task');
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<Plus size={16} />}
        onClick={() => setIsOpen(true)}
      >
        New Task
      </Button>

      <Modal
        title="New Task"
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
            key="submit"
            type="primary"
            onClick={handleAdd}
            loading={isPending}
            disabled={!form.todo || !form.date}
          >
            {isPending ? 'Adding...' : 'Add'}
          </Button>,
        ]}
      >
        <div className="space-y-3">
          <div className='space-y-1'>
            <label htmlFor="todo">Task</label>
            <Input
              type="text"
              id="todo"
              placeholder="What you're gonna do?"
              value={form.todo}
              onChange={handleInputChange}
              disabled={isPending}
              required
            />
          </div>
          <div className='space-y-1'>
            <label htmlFor="date">Date</label>
            <DatePicker
              id="date"
              className="w-full"
              format={"DD-MM-YYYY"}
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

export default AddModal;