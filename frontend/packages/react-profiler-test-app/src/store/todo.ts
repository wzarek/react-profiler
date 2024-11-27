import { create } from "zustand";
import { Todo } from "../types/todo";

type State = {
  todos: Todo[];
};

type Action = {
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
};

// todo: figure out better store as we use react query for adding/deleting/getting

const useTodoStore = create<State & Action>((set) => ({
  todos: [],

  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
}));

export default useTodoStore;
