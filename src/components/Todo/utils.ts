import { TodoInterface } from "./types";

export const FILTERS_LOGIC = {
  all: () => true,
  active: (todo: TodoInterface) => !todo.isCompleted,
  completed: (todo: TodoInterface) => todo.isCompleted,
};
