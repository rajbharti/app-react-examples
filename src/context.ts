import { createContext, useContext } from "react";
import type { TagsContextInterface } from "./types";

export const TagsContext = createContext<TagsContextInterface>(
  {} as TagsContextInterface
);

export function useTagsContext() {
  return useContext(TagsContext);
}
