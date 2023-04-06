import { useMemo, useState } from "react";
import type { TodoInterface, ActionInterface, FilterType } from "./types";
import { FILTERS_LOGIC } from "./utils";
import Filter from "./Filter";
import Todo from "./Todo";

interface PropsInterface {
  todos: TodoInterface[];
  dispatch: React.Dispatch<ActionInterface>;
}

export default function Todos({ todos, dispatch }: PropsInterface) {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const filteredTodos = useMemo(
    () => todos.filter(activeFilter ? FILTERS_LOGIC[activeFilter] : Boolean),
    [todos, activeFilter]
  );

  return (
    <>
      <Filter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        todos={todos}
      />
      <ul>
        {filteredTodos.map((todo: TodoInterface) => (
          <Todo key={todo.id.toString()} task={todo} dispatch={dispatch} />
        ))}
      </ul>
    </>
  );
}
