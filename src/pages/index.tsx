import UncompletedTodo from "@/components/uncompletedTodo";
import AddModal from "@/components/addModal";
import { useEffect, useState } from "react";
import { Todo } from "@/types/type";
import todoServices from "@/services/service";
import CompletedTodo from "@/components/completedTodo";

export default function Home() {
  const [uncompletedTodo, setUncompletedTodo] = useState<Todo[]>([]);
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      todoServices.getTodos().then(({ data }) => {
        setUncompletedTodo(data.data.filter((todo: Todo) => !todo.isCompleted));
        setCompletedTodo(data.data.filter((todo: Todo) => todo.isCompleted));
      });
    }

    getTodos();
  }, []);

  return (
    <>
      <header className="container mx-auto mt-16 space-y-5 md:max-w-2xl">
        <h2 className="text-2xl font-bold">To-Do</h2>
        <div className="shrink-0 bg-gray-200 h-[1px] w-full"></div>
      </header>
      <main>
        <section className="container mx-auto mt-5 space-y-5 md:max-w-2xl">
          <AddModal />
          <div className="space-y-3">
            <UncompletedTodo uncompletedTodo={uncompletedTodo} />
            <div className="shrink-0 bg-gray-200 h-[1px] w-full"></div>
            <CompletedTodo completedTodo={completedTodo} />
          </div>
        </section>
      </main>
    </>
  );
}
