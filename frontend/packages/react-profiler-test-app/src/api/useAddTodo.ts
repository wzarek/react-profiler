import { useMutation, useQueryClient, UseMutationResult } from "react-query";
import { randomDelay } from "../utils/fakeApi";
import { Todo } from "../types/todo";

const addTodo = (todo: Omit<Todo, "id">): Promise<Todo> =>
  new Promise((resolve, reject) => {
    const { delay, isError } = randomDelay();
    setTimeout(() => {
      if (isError) {
        reject(new Error("Failed to save the todo. Please try again."));
      } else {
        resolve({ ...todo, id: Date.now() });
      }
    }, delay);
  });

export const useAddTodo = (): UseMutationResult<
  Todo,
  Error,
  Omit<Todo, "id">
> => {
  const queryClient = useQueryClient();

  return useMutation(addTodo, {
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>("todos", (oldTodos) => [
        ...(oldTodos || []),
        newTodo,
      ]);
    },
  });
};
