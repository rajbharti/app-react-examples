import { useReducer } from "react";
import { reducer, initialState } from "./reducer";
import type { TagsInterface } from "../../types";
import Form from "./Form";
import Todos from "./Todos";
import Tags from "../../components/Tags";

export default function TodoApp({ tags }: TagsInterface) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section className="todos">
      <h3>
        Todo <Tags tags={tags} />
      </h3>
      <Form formOperationType="add" dispatch={dispatch} />
      <Todos todos={state} dispatch={dispatch} />
    </section>
  );
}
