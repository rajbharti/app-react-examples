import { forwardRef } from "react";
import type { TodoShape, Action } from "./types";
import Todo from "./Todo";

type Ref = HTMLUListElement;

interface Props {
  todos: TodoShape[];
  dispatch: React.Dispatch<Action>;
}

export default forwardRef<Ref, Props>(function Todos({ todos, dispatch }, ref) {
  return (
    <ul className="max-h-253px overflow-y-auto" ref={ref}>
      {todos.map((todo: TodoShape) => (
        <Todo key={todo.id} task={todo} dispatch={dispatch} />
      ))}
    </ul>
  );
});
