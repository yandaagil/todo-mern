import { useSelect } from '@/stores/select.store';
import { useTodo } from '@/hooks/useTodo';
import { TodoData } from '@/types/todo.type';
import { Button, Popconfirm, message } from 'antd';
import React, { FC, useState } from 'react'

type SelectProps = {
  todos: TodoData[]
}

const Select: FC<SelectProps> = ({ todos }) => {
  const {
    selectMode,
    setSelectMode,
    selectedTodos,
    handleSelectAll,
    handleResetSelect,
  } = useSelect();
  const { deleteMutation: { mutateAsync, isPending } } = useTodo();
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      await mutateAsync({ ids: selectedTodos })
      message.success('Task deleted successfully')
      handleResetSelect()
      setOpen(false)
    } catch (error) {
      console.log(error);
      message.error('Failed to delete task')
    }
  };

  return (
    <div className="space-x-2">
      {selectMode ? (
        <>
          <Button
            type="link"
            onClick={() => handleSelectAll(todos)}
            disabled={isPending}
          >
            {selectedTodos.length === todos.length ? 'Deselect All' : 'Select All'}
          </Button>
          <Button
            onClick={handleResetSelect}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Popconfirm
            placement='topRight'
            title="Delete selected todos"
            description="Are you sure you want to delete the selected todos?"
            open={open}
            onConfirm={handleDelete}
            okButtonProps={{ loading: isPending }}
            onCancel={() => setOpen(false)}
            okText="Yes"
          >
            <Button
              color="danger"
              variant="filled"
              disabled={selectedTodos.length === 0}
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
          </Popconfirm>
        </>
      ) : (
        <Button
          disabled={todos.length === 0}
          onClick={() => setSelectMode(true)}
        >
          Select
        </Button>
      )}
    </div>
  )
}

export default Select