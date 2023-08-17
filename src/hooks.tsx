import { useContext, useDebugValue, useEffect } from "react";
import { ExampleContext, TagsContext } from "./context";

export function useTagsContext() {
  return useContext(TagsContext);
}

export function useExampleContext() {
  return useContext(ExampleContext);
}

type SetFocusRef = React.RefObject<HTMLElement>;

export function useFocus(ref: SetFocusRef) {
  useDebugValue(ref, () => Date.now());
  useEffect(() => {
    ref.current?.focus();
  }, []);
}
