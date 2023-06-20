export interface TodoShape {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Action {
  type: "add" | "edit" | "delete" | "toggle";
  payload: Partial<TodoShape>;
}

export type FormOperationType = "add" | "edit";

export type FilterUnion = "all" | "active" | "completed" | null;
