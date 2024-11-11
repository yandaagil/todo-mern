import Todo from "@/components/todo";
import AddModal from "@/components/addModal";
import { Divider, Spin, Tabs, TabsProps } from "antd";
import { useTodo } from "@/hooks/useTodo";
import Select from "@/components/select";
import Input, { SearchProps } from "antd/es/input";
import { useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import ProfileMenu from "@/components/profileMenu";

const Home = () => {
  const { data: session } = useSession()
  const [search, setSearch] = useState<string>("");
  const { query: { data, error, isLoading } } = useTodo(search)
  const { todos, uncompletedTodo, completedTodo } = data || { todos: [], uncompletedTodo: [], completedTodo: [] };

  const onSearch: SearchProps['onSearch'] = (value: string) => setSearch(value);

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'All',
      children: <>
        <Todo todo={uncompletedTodo} />
        <Divider />
        <Todo todo={completedTodo} />
      </>,
    },
    {
      key: '2',
      label: 'Pending',
      children: <Todo todo={uncompletedTodo} />,
    },
    {
      key: '3',
      label: 'Done',
      children: <Todo todo={completedTodo} />,
    },
  ];

  return (
    <>
      <Head>
        <title>Todo</title>
      </Head>
      <div className="container mx-auto py-5 px-5 md:py-16 space-y-5 md:max-w-2xl">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">To-Do</h2>
          {session && <ProfileMenu />}
        </header>
        <Divider />
        <main>
          <section className="space-y-5">
            <div className="flex justify-between">
              <AddModal />
              <Select todos={todos} />
            </div>
            <Input.Search
              placeholder="Search todo"
              onSearch={onSearch}
              allowClear
            />
            <div className="space-y-3">
              {isLoading ? (
                <div className="flex items-center justify-center mt-10">
                  <Spin />
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
    </>
  );
}

export default Home
