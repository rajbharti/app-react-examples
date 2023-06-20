import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import type { TodoShape, Action, FormOperationType } from "./types";

interface Props {
  formOperationType: FormOperationType;
  dispatch: React.Dispatch<Action>;
  setToggleForm?: (toggle: boolean) => void;
  task?: TodoShape;
}

export default function AddTodo({
  formOperationType,
  dispatch,
  setToggleForm,
  task,
}: Props) {
  const [hasError, setHasError] = useState(false);
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
      setHasError(true);
      inputRef.current?.focus();
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
    const value = event.currentTarget.value;

    if (hasError && value.trim().length === 1) {
      setHasError(false);
    }

    setText(value);
  }

  function handleCancel() {
    setToggleForm?.(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        ref={inputRef}
        className={clsx(hasError && "border-red-500")}
      />

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
