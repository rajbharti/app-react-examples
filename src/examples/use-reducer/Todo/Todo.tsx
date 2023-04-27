import { useState } from "react";
import clsx from "clsx";
import Form from "./Form";
import type { TodoInterface, Action } from "./types";

interface PropsInterface {
  task: TodoInterface;
  dispatch: React.Dispatch<Action>;
}

export default function Todo({ task, dispatch }: PropsInterface) {
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
    <li>
      {toggleForm ? (
        <Form
          dispatch={dispatch}
          formOperationType="edit"
          setToggleForm={setToggleForm}
          task={task}
        />
      ) : (
        <>
          <span
            onClick={() => handleToggle(id)}
            className={clsx(isCompleted && "completed")}
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
