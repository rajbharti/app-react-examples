import { TodoShape, TodosFilter } from "./types";

type FiltersLogic = Record<
  NonNullable<TodosFilter>,
  (todo: TodoShape) => TodoShape[] | boolean
>;

export const filtersLogic: FiltersLogic = {
  all: () => true,
  active: (todo: TodoShape) => !todo.isCompleted,
  completed: (todo: TodoShape) => todo.isCompleted,
};

export function getFilterCount(todos: TodoShape[], filter: TodosFilter) {
  return filter ? todos.filter(filtersLogic[filter]).length : 0;
}
