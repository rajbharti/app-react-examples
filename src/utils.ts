import type { CompType } from "./types";
import { mapTagToComps } from "./App";

export function getComponentTags(Comp: CompType) {
  const list = [];

  for (const tag in mapTagToComps) {
    if (mapTagToComps[tag].find((c: CompType) => c === Comp)) {
      list.push(tag);
    }
  }

  return list;
}
