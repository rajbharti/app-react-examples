import type { TodoShape, Action } from "./types";
import Todo from "./Todo";

interface Props {
  todos: TodoShape[];
  dispatch: React.Dispatch<Action>;
}

export default function Todos({ todos, dispatch }: Props) {
  return (
    <ul className="max-h-253px overflow-y-auto">
      {todos.map((todo: TodoShape) => (
        <Todo key={todo.id} task={todo} dispatch={dispatch} />
      ))}
    </ul>
  );
}
