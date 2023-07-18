import { createContext } from "react";
import type { TagsContextShape, ExampleLevel } from "./types";

// Tags Context
export const TagsContext = createContext<TagsContextShape>(
  {} as TagsContextShape
);

// Example Context
export const ExampleContext = createContext<ExampleLevel>(1);
