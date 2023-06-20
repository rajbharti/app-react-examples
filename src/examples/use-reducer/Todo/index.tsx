import { useState, useReducer } from "react";
import Example from "src/components/Example";
import Form from "./Form";
import Filters from "./Filters";
import Todos from "./Todos";
import { type TodoShape, FilterUnion } from "./types";
import { reducer } from "./reducer";
import { filtersLogic } from "./utils";

const initialState: TodoShape[] = [];

export default function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [activeFilter, setActiveFilter] = useState<FilterUnion>(null);

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
