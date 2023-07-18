import { useContext } from "react";
import { ExampleContext, TagsContext } from "./context";

export function useTagsContext() {
  return useContext(TagsContext);
}

export function useExampleContext() {
  return useContext(ExampleContext);
}
