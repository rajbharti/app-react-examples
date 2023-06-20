import type { TodoInterface, Action } from "./types";
import Todo from "./Todo";

interface PropsInterface {
  todos: TodoInterface[];
  dispatch: React.Dispatch<Action>;
}

export default function Todos({ todos, dispatch }: PropsInterface) {
  return (
    <ul className="max-h-253px overflow-y-auto">
      {todos.map((todo: TodoInterface) => (
        <Todo key={todo.id} task={todo} dispatch={dispatch} />
      ))}
    </ul>
  );
}
