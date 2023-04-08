import { TodoInterface, FilterType } from "./types";

type FiltersLogicType = Record<
  NonNullable<FilterType>,
  (todo: TodoInterface) => TodoInterface[] | boolean
>;

export const filtersLogic: FiltersLogicType = {
  all: () => true,
  active: (todo: TodoInterface) => !todo.isCompleted,
  completed: (todo: TodoInterface) => todo.isCompleted,
};

export function getFilterCount(todos: TodoInterface[], filter: FilterType) {
  return filter ? todos.filter(filtersLogic[filter]).length : 0;
}
