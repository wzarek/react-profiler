import React, { useState } from "react";
import { useAddTodo } from "../api/useAddTodo";
import { ArrowSync16Filled } from "@fluentui/react-icons";

const AddTodo: React.FC = () => {
  const [text, setText] = useState("");
  const useAddTodoMutation = useAddTodo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await useAddTodoMutation.mutateAsync({ text, completed: false });
    setText("");
  };

  //const profiledHandleSubmit = useProfiledCallback(handleSubmit);

  if (Math.random() < 0.3) {
    throw new Error("abc");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Todo</h1>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo"
          className="w-full p-2 border rounded text-black"
        />
        <button
          type="submit"
          className="bg-black hover:bg-black/80 text-white px-4 py-2 rounded-lg"
          disabled={useAddTodoMutation.isLoading}
        >
          {useAddTodoMutation.isLoading ? (
            <ArrowSync16Filled className="animate-spin" />
          ) : (
            "Add"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
