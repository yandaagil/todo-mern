import UncompletedTodo from "@/components/uncompletedTodo";
import AddModal from "@/components/addModal";
import { TodoData } from "@/types/todo.type";
import CompletedTodo from "@/components/completedTodo";
import { Button, Divider, Tabs, TabsProps } from "antd";
import { useTodo } from "@/hooks/useTodo";
import Header from "@/components/header";

export default function Home() {
  const { query: { data, error, isLoading } } = useTodo()

  const uncompletedTodo = data?.data.data.filter((todo: TodoData) => !todo.isCompleted) || [];
  const completedTodo = data?.data.data.filter((todo: TodoData) => todo.isCompleted) || [];

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'All',
      children: <>
        <UncompletedTodo uncompletedTodo={uncompletedTodo} />
        <Divider />
        <CompletedTodo completedTodo={completedTodo} />
      </>,
    },
    {
      key: '2',
      label: 'Uncompleted',
      children: <UncompletedTodo uncompletedTodo={uncompletedTodo} />,
    },
    {
      key: '3',
      label: 'Completed',
      children: <CompletedTodo completedTodo={completedTodo} />,
    },
  ];

  return (
    <div className="container mx-auto space-y-5 md:max-w-2xl">
      <Header />
      <Divider />
      <main>
        <section className="space-y-5">
          <div className="flex justify-between">
            <AddModal />
            <div className="space-x-3">
              <Button type="text">Select</Button>
              <Button>Filter</Button>
            </div>
          </div>
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center">
                <p className="text-gray-500">Error: {error.message}</p>
              </div>
            ) : (
              <Tabs defaultActiveKey="1" items={tabItems} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
