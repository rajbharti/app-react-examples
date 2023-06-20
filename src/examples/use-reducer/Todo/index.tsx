import { useState, useReducer } from "react";
import { reducer } from "./reducer";
import { type TodoInterface, FilterType } from "./types";
import { filtersLogic } from "./utils";
import Example from "src/components/Example";
import Form from "./Form";
import Filters from "./Filters";
import Todos from "./Todos";

const initialState: TodoInterface[] = [];

export default function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const filteredTodos = todos.filter(
    activeFilter ? filtersLogic[activeFilter] : Boolean
  );

  return (
    <Example hasNestedComp={false} title="Todo">
      <Form formOperationType="add" dispatch={dispatch} />
      <Filters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        todos={todos}
      />
      <Todos todos={filteredTodos} dispatch={dispatch} />
    </Example>
  );
}
