import { useState, useReducer, useEffect, useRef } from "react";
import Example from "src/components/Example";
import Form from "./Form";
import Filters from "./Filters";
import Todos from "./Todos";
import { type TodoShape, TodosFilter } from "./types";
import { reducer } from "./reducer";
import { filtersLogic } from "./utils";

const initialState: TodoShape[] = [];

export default function App() {
  // example with complete arguments
  // const [state, dispatch] = useReducer(reducer, username, createInitialState); // createInitialState(username)

  const [todos, dispatch] = useReducer(reducer, initialState);
  const [activeFilter, setActiveFilter] = useState<TodosFilter>(null);
  const [isTodoAdded, setIsTodoAdded] = useState(false);
  const todosElRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // scroll to added todo
    const el = todosElRef?.current as HTMLUListElement;
    if (isTodoAdded && el.scrollHeight > el.clientHeight) {
      el.scrollTo(0, el.scrollHeight);
      setIsTodoAdded(false);
    }
  });

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
