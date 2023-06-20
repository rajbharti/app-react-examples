import { createContext, useContext } from "react";
import type { TagsContextShape } from "./types";

export const TagsContext = createContext<TagsContextShape>(
  {} as TagsContextShape
);

export function useTagsContext() {
  return useContext(TagsContext);
}
