import { useState, useRef, useEffect } from "react";
import type {
  TodoInterface,
  ActionInterface,
  FormOperationType,
} from "./types";

interface PropsInterface {
  formOperationType: FormOperationType;
  dispatch: React.Dispatch<ActionInterface>;
  onToggleForm?: (toggle: boolean) => void;
  task?: TodoInterface;
}

export default function AddTodo({
  formOperationType,
  dispatch,
  onToggleForm,
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

    switch (formOperationType) {
      case "add":
        dispatch({
          type: formOperationType,
          payload: { text },
        });
        break;
      case "edit":
        dispatch({
          type: formOperationType,
          payload: { id: task?.id, text },
        });
        handleCancel();
        break;
    }

    setText("");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.currentTarget.value);
  }

  function handleCancel() {
    onToggleForm?.(false);
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
