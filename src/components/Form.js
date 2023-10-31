import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { v4 } from "uuid";

function Form() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    document.title = "TODO LIST";
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      setTodos([...todos, { id: v4(), todo: input, checked: false }]);
    }

    setInput("");
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleCheckbox = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <>
      <form
        className="flex flex-col  bg-slate-400 w-fit p-4 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className=" flex flex-col space-y-2">
          <label className="text-white font-bold" htmlFor="input">
            New Todo
          </label>
          <input
            className="pl-2 w-56 rounded-md outline-none bg-slate-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            id="input"
            placeholder="What do you want to do?"
          />
        </div>
        <button className="text-left border w-fit pl-2 pr-2 text-white rounded-md mt-4">
          Add todo
        </button>
      </form>
      <br />
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="space-x-2 flex justify-between items-center bg-slate-400 p-2 rounded-md w-[500px]"
          >
            <div className="space-x-2 flex items-center">
              <input
                className="accent-slate-400"
                type="checkbox"
                id={`todo-${todo.id}`}
                onChange={() => handleCheckbox(todo.id)}
                checked={todo.checked}
              />
              <label
                className={`text-white ${
                  todo.checked ? "line-through decoration-red-500" : ""
                }`}
                htmlFor={`todo-${todo.id}`}
              >
                {todo.todo}
              </label>
            </div>
            <MdDeleteOutline
              onClick={() => handleDelete(todo.id)}
              className="text-white border p-[1px] text-xl rounded-sm cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Form;
