import type { TagType, CompType } from "./types";
import { mapTagToComps } from "./App";

export function getCompTags(Comp: CompType, activeTag: TagType): TagType[] {
  const list = [];

  for (const tag in mapTagToComps) {
    if (mapTagToComps[tag].find((c: CompType) => c === Comp)) {
      // insert all other tags except activeTag
      if (tag !== activeTag) {
        list.push(tag);
      }
    }
  }

  // insert activeTag at beginning
  list.unshift(activeTag);

  return list;
}

export function getActiveTagCompsCount(tag: TagType) {
  return mapTagToComps[tag]?.length || 0;
}
