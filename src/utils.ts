import type { TagType, CompType } from "./types";
import { mapTagToComps } from "./App";

export function getCompTags(Comp: CompType): TagType[] {
  const list = [];

  for (const tag in mapTagToComps) {
    if (mapTagToComps[tag].find((c: CompType) => c === Comp)) {
      list.push(tag);
    }
  }

  return list;
}

export function getActiveTagCompsCount(tag: TagType) {
  return mapTagToComps[tag]?.length || 0;
}
