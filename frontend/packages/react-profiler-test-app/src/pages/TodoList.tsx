import React, { FC } from "react";
import { useGetTodos } from "../api/useGetTodos";
import { ArrowSync16Filled, Dismiss16Filled } from "@fluentui/react-icons";
import { clsx } from "clsx";
import { Todo } from "../types/todo";
import { useDeleteTodo } from "../api/useDeleteTodo";
import { Monitor } from "react-profiling-tool";

const TodoList: React.FC = () => {
  const { isFetching, refetch } = useGetTodos();

  return (
    <Monitor componentName="TodoList">
      <div>
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Todo List</h1>
          <button
            onClick={() => refetch()}
            className="bg-black hover:bg-black/80 text-white px-4 py-2 rounded-lg"
            disabled={isFetching}
          >
            <ArrowSync16Filled
              className={clsx({ "animate-spin": isFetching })}
            />
          </button>
        </div>
        <TodoListData />
      </div>
    </Monitor>
  );
};

const TodoListData = () => {
  const { data: todos, isLoading, error } = useGetTodos();

  if (isLoading) {
    // todo: add skeleton loader
    return <p className="text-gray-200 font-semibold">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{(error as Error).message}</p>;
  }

  if (!todos?.length) {
    return <p className="text-gray-200">No todos found</p>;
  }

  return (
    <Monitor componentName="TodoListData">
      <ul className="space-y-2 text-black font-semibold">
        {todos.map((todo) => (
          <TodoSingle key={todo.id} todo={todo} />
        ))}
      </ul>
    </Monitor>
  );
};

type TodoSingleProps = {
  todo: Todo;
};

const TodoSingle: FC<TodoSingleProps> = ({ todo }) => {
  const useDeleteTodoMutation = useDeleteTodo();

  return (
    <Monitor componentName="TodoSingle">
      <li
        key={todo.id}
        className="flex justify-between items-center p-2 bg-gray-100 rounded shadow"
      >
        <span>{todo.text}</span>
        {useDeleteTodoMutation.isLoading ? (
          <ArrowSync16Filled className="animate-spin" />
        ) : (
          <button
            onClick={() => useDeleteTodoMutation.mutate(todo.id)}
            aria-label="Delete"
            className="text-red-600 hover:underline bg-black/10 hover:bg-black/25 w-8 h-8 rounded-lg"
          >
            <Dismiss16Filled />
          </button>
        )}
      </li>
    </Monitor>
  );
};

export default TodoList;
