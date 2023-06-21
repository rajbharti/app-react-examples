import { nanoid } from "nanoid";
import type { TodoShape, Action } from "./types";

export function reducer(
  state: TodoShape[],
  { type, payload }: Action
): TodoShape[] {
  switch (type) {
    case "add":
      return [
        ...state,
        {
          id: nanoid(),
          text: payload.text as string,
          isCompleted: false,
        },
      ];

    case "edit":
      return [
        ...state.map((todo: TodoShape) => {
          if (todo.id === payload.id) {
            return { ...todo, text: payload.text as string };
          }
          return todo;
        }),
      ];

    case "delete":
      return [...state.filter((todo: TodoShape) => todo.id !== payload.id)];

    case "toggle":
      return [
        ...state.map((todo: TodoShape) => {
          if (todo.id === payload.id) {
            return { ...todo, isCompleted: !todo.isCompleted };
          }
          return todo;
        }),
      ];

    default:
      return state;
  }
}
