import { useState } from "react";
import clsx from "clsx";
import Form from "./Form";
import type { TodoShape, Action } from "./types";

interface Props {
  task: TodoShape;
  dispatch: React.Dispatch<Action>;
}

export default function Todo({ task, dispatch }: Props) {
  const [toggleForm, setToggleForm] = useState(false);
  const { id, text, isCompleted } = task;

  function handleToggle(id: string) {
    dispatch({
      type: "toggle",
      payload: { id },
    });
  }

  function handleEdit() {
    setToggleForm(!toggleForm);
  }

  function handleDelete(id: string) {
    dispatch({
      type: "delete",
      payload: { id },
    });
  }

  return (
    <li className="cursor-default list-disc">
      {toggleForm ? (
        <Form
          formOperationType="edit"
          setToggleForm={setToggleForm}
          task={task}
          dispatch={dispatch}
        />
      ) : (
        <>
          <span
            onClick={() => handleToggle(id)}
            className={clsx(isCompleted && "text-gray-500 line-through")}
          >
            {text}
          </span>{" "}
          <button onClick={() => handleEdit()}>Edit</button>
          <button onClick={() => handleDelete(id)}>Delete</button>
        </>
      )}
    </li>
  );
}
