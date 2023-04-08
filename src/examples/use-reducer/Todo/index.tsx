import { useState, useReducer } from "react";
import { reducer } from "./reducer";
import { type TodoInterface, FilterType } from "./types";
import { filtersLogic } from "./utils";
import Header from "../../../components/Header";
import Form from "./Form";
import Filters from "./Filters";
import Todos from "./Todos";

const initialState: TodoInterface[] = [];

export default function TodoApp() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const filteredTodos = todos.filter(
    activeFilter ? filtersLogic[activeFilter] : Boolean
  );

  return (
    <section className="todos">
      <Header title="Todo" />
      <Form formOperationType="add" dispatch={dispatch} />
      <Filters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        todos={todos}
      />
      <Todos todos={filteredTodos} dispatch={dispatch} />
    </section>
  );
}
