import { useReducer } from "react";
import { reducer, initialState } from "./reducer";
import type { TagsInterface } from "../../../types";
import Header from "../../../components/Header";
import Form from "./Form";
import Todos from "./Todos";

export default function TodoApp({ tags }: TagsInterface) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section className="todos">
      <Header title="Todo" tags={tags} />
      <Form formOperationType="add" dispatch={dispatch} />
      <Todos todos={state} dispatch={dispatch} />
    </section>
  );
}
