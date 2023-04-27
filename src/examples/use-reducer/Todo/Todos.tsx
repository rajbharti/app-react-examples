import type { TodoInterface, Action } from "./types";
import Todo from "./Todo";

interface PropsInterface {
  todos: TodoInterface[];
  dispatch: React.Dispatch<Action>;
}

export default function Todos({ todos, dispatch }: PropsInterface) {
  return (
    <ul className="list">
      {todos.map((todo: TodoInterface) => (
        <Todo key={todo.id} task={todo} dispatch={dispatch} />
      ))}
    </ul>
  );
}
