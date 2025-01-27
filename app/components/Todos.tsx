"use client";
import { useState, useEffect } from "react";

type todos = {
  id: number;
  description: string;
};

export default function Todos() {
  const [todos, setTodos] = useState<todos[]>([]);

  const [text, setText] = useState("");

  const fetchTodos = async () => {
    const response = await fetch("https://todoapp-psi-lac.vercel.app/api");
    const data = await response.json();
    setTodos(data);
  };

  const deleteTodo = async (tid: number) => {
    await fetch(`https://todoapp-psi-lac.vercel.app/api/${tid}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);

  const modifyTodo = async () => {
    const todoId = currentTodoId;
    await fetch(`https://todoapp-psi-lac.vercel.app/api/${todoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: description }),
    });

    fetchTodos();
    setVisible(false);
  };

  const postTodo = async () => {
    if (text != "") {
      await fetch("https://todoapp-psi-lac.vercel.app/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text }),
      });
      setText("");
      fetchTodos();
    } else {
      alert("Input cannot be blank");
    }
  };

  const sortedTodos = todos.sort((a, b) => a.id - b.id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="navbar bg-base-100 justify-center">
        <div className="gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Input"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              className="input input-bordered w-auto"
            />
          </div>
          <button
            className="btn btn-square btn-base-100"
            onClick={() => {
              postTodo();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
      {!loading && (
        <div className="overflow-x-auto h-[90vh]">
          <table className="table table-pin-rows">
            <thead>
              <tr>
                <th></th>
                <th className="w-2/3">Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {sortedTodos.map((todo: todos, i: number) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{todo.description}</td>
                  <td>
                    <button
                      className="btn btn-square btn-warning"
                      onClick={() => {
                        setDescription(todo.description);
                        setCurrentTodoId(todo.id);
                        setVisible(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <div
                      className={`h-screen w-screen backdrop-blur-sm fixed z-50 top-0 left-0 ${
                        visible ? "block" : "hidden"
                      } transition-all`}
                    >
                      <div className="card bg-base-100 w-96 shadow-xl relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                        <div className="card-body">
                          <h2 className="card-title justify-between">
                            Edit Todo
                            <button
                              className="btn btn-ghost btn-square"
                              onClick={() => {
                                setVisible(false);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </h2>
                          <div>
                            <label className="form-control w-full max-w-xs">
                              <div className="label">
                                <span className="label-text">Description</span>
                              </div>
                              <input
                                type="text"
                                value={description}
                                onChange={(e) => {
                                  setDescription(e.target.value);
                                }}
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                              />
                            </label>
                          </div>
                          <div className="card-actions justify-end">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                modifyTodo();
                              }}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-square btn-error"
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {sortedTodos.length == 0 && (
                <tr>
                  <th className="italic">0</th>
                  <td className="italic font-bold">No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {loading && (
        <div className="flex items-center justify-center h-[90vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
}
