import { useState, useReducer, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Example from "src/components/Example";
import Form from "./Form";
import Filters from "./Filters";
import Todos from "./Todos";
import type { TodosFilter } from "./types";
import { reducer } from "./reducer";
import { filtersLogic } from "./utils";

function createInitialState() {
  return [
    {
      id: nanoid(),
      text: "Complete React",
      isCompleted: false,
    },
    {
      id: nanoid(),
      text: "Complete Docker",
      isCompleted: true,
    },
  ];
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, null, createInitialState);
  const [activeFilter, setActiveFilter] = useState<TodosFilter>(null);
  const [isTodoAdded, setIsTodoAdded] = useState(false);
  const todosElRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // scroll to added todo
    const el = todosElRef?.current as HTMLUListElement;
    if (isTodoAdded && el.scrollHeight > el.clientHeight) {
      el.scrollTo(0, el.scrollHeight);
    }

    return () => setIsTodoAdded(false);
  }, [isTodoAdded]);

  const filteredTodos = todos.filter(
    activeFilter ? filtersLogic[activeFilter] : Boolean
  );

  return (
    <Example hasNestedComp={false} title="Todo">
      <Form
        formOperationType="add"
        dispatch={dispatch}
        setIsTodoAdded={setIsTodoAdded}
      />
      <Filters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        todos={todos}
      />
      <Todos todos={filteredTodos} dispatch={dispatch} ref={todosElRef} />
    </Example>
  );
}
