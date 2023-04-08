import { useState, useRef, useEffect } from "react";
import type {
  TodoInterface,
  ActionInterface,
  FormOperationType,
} from "./types";

interface PropsInterface {
  formOperationType: FormOperationType;
  dispatch: React.Dispatch<ActionInterface>;
  setToggleForm?: (toggle: boolean) => void;
  task?: TodoInterface;
}

export default function AddTodo({
  formOperationType,
  dispatch,
  setToggleForm,
  task,
}: PropsInterface) {
  const [text, setText] = useState(
    formOperationType === "add" ? "" : task?.text
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text?.trim().length) {
      return;
    }

    const payload =
      formOperationType === "add" ? { text } : { id: task?.id, text };

    dispatch({
      type: formOperationType,
      payload,
    });

    if (formOperationType === "edit") {
      handleCancel();
    }

    setText("");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.currentTarget.value);
  }

  function handleCancel() {
    setToggleForm?.(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} ref={inputRef} />

      {formOperationType === "add" ? (
        <input type="submit" value="Add" />
      ) : (
        <>
          <input type="submit" value="Save" />
          <input type="button" value="Cancel" onClick={handleCancel} />
        </>
      )}
    </form>
  );
}
