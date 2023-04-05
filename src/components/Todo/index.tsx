import { useReducer } from "react";
import { reducer, initialState } from "./reducer";
import Form from "./Form";
import Todos from "./Todos";

export default function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="todos">
      <h3>
        Todo{" "}
        <span className="inline-tags">
          <span>#useState</span> <span>#useReducer</span>
        </span>
      </h3>
      <Form formOperationType="add" dispatch={dispatch} />
      <Todos todos={state} dispatch={dispatch} />
    </div>
  );
}
