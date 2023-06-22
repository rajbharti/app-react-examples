import { useState, useReducer, useRef } from "react";
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
  const todosElRef = useRef<HTMLUListElement>(null);

  const filteredTodos = todos.filter(
    activeFilter ? filtersLogic[activeFilter] : Boolean
  );

  return (
    <Example hasNestedComp={false} title="Todo">
      <Form
        formOperationType="add"
        dispatch={dispatch}
        todosElRef={todosElRef}
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
