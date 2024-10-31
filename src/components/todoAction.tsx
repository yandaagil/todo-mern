import React, { FC } from 'react'
import DetailTodo from './detailTodo'
import EditModal from './editModal'
import DeleteModal from './deleteModal'
import { TodoData } from '@/types/todo.type'

type TodoActionProps = {
  todo: TodoData
}

const TodoAction: FC<TodoActionProps> = ({ todo }) => {
  return (
    <div className="items-center gap-2 hidden group-hover:flex">
      <DetailTodo todo={todo} />
      <EditModal todo={todo} />
      <DeleteModal todo={todo} />
    </div>
  )
}

export default TodoAction