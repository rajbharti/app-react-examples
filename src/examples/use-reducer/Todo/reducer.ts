import { nanoid } from "nanoid";
import type { TodoInterface, ActionInterface } from "./types";

export function reducer(
  state: TodoInterface[],
  action: ActionInterface
): TodoInterface[] {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: nanoid(),
          text: action.payload.text as string,
          isCompleted: false,
        },
      ];

    case "edit":
      return [
        ...state.map((todo: TodoInterface) => {
          if (todo.id === action.payload.id) {
            return { ...todo, text: action.payload.text as string };
          }
          return todo;
        }),
      ];

    case "delete":
      return [
        ...state.filter((todo: TodoInterface) => todo.id !== action.payload.id),
      ];

    case "toggle":
      return [
        ...state.map((todo: TodoInterface) => {
          if (todo.id === action.payload.id) {
            return { ...todo, isCompleted: !todo.isCompleted };
          }
          return todo;
        }),
      ];

    default:
      return state;
  }
}
