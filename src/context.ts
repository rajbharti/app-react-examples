import { createContext, useContext } from "react";
import type { TagsContextShape } from "./types";

// Tags Context
export const TagsContext = createContext<TagsContextShape>(
  {} as TagsContextShape
);

export function useTagsContext() {
  return useContext(TagsContext);
}
