import { useQuery, UseQueryResult } from "react-query";
import { Todo } from "../types/todo";
import { randomDelay } from "../utils/fakeApi";

const getTodos = (): Promise<Todo[]> =>
  new Promise((resolve, reject) => {
    const { delay, isError } = randomDelay();
    setTimeout(() => {
      if (isError) {
        reject(new Error("Failed to fetch todos. Please try again."));
      } else {
        resolve([
          { id: 1, text: "Learn React Query", completed: false },
          { id: 2, text: "Use Zustand for state management", completed: false },
        ]);
      }
    }, delay);
  });

export const useGetTodos = (): UseQueryResult<Todo[], Error> => {
  return useQuery("todos", getTodos, {
    staleTime: 30000,
    retry: 2,
  });
};
