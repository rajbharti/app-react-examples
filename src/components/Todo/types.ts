export interface TodoInterface {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ActionInterface {
  type: "add" | "edit" | "delete" | "toggle";
  payload: Partial<TodoInterface>;
}

export type FormOperationType = "add" | "edit";

export type FilterType = "all" | "active" | "completed" | null;
