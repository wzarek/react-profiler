import { useMutation, useQueryClient, UseMutationResult } from "react-query";
import { randomDelay } from "../utils/fakeApi";
import { Todo } from "../types/todo";
import { useAsyncProfiledCallback } from "react-profiling-tool";

const deleteTodo = (todoId: number): Promise<number> =>
  new Promise((resolve, reject) => {
    const { delay, isError } = randomDelay();
    setTimeout(() => {
      if (isError) {
        reject(new Error("Failed to save the todo. Please try again."));
      } else {
        resolve(todoId);
      }
    }, delay);
  });

export const useDeleteTodo = (): UseMutationResult<number, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation(useAsyncProfiledCallback(deleteTodo, "useDeleteTodo"), {
    onSuccess: (deletedTodo) => {
      const todos = queryClient.getQueryData<Todo[]>("todos") || [];
      queryClient.setQueryData<Todo[]>(
        "todos",
        todos.filter((todo) => todo.id !== deletedTodo)
      );
    },
  });
};
