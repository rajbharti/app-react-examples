import { useState } from "react";
import clsx from "clsx";
import Form from "./Form";
import type { TodoInterface, ActionInterface } from "./types";

interface PropsInterface {
  task: TodoInterface;
  dispatch: React.Dispatch<ActionInterface>;
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
          onToggleForm={setToggleForm}
          task={task}
        />
      ) : (
        <div className={clsx(isCompleted && "completed")}>
          <span onClick={() => handleToggle(id)}>{text}</span>{" "}
          <button onClick={() => handleEdit()}>Edit</button>
          <button onClick={() => handleDelete(id)}>Delete</button>
        </div>
      )}
    </li>
  );
}
