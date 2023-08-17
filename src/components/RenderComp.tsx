import { useMemo } from "react";
import type { ActiveTag, Comp, ActiveCategory, TagList } from "../types";
import { TagsContext } from "../context";

interface Props {
  Comp: Comp;
  tags: TagList[];
  setActiveCategory: React.Dispatch<React.SetStateAction<ActiveCategory>>;
  activeTag: NonNullable<ActiveTag>;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTag>>;
}

export default function RenderComp({
  Comp,
  tags,
  setActiveCategory,
  activeTag,
  setActiveTag,
}: Props) {
  const value = useMemo(
    () => ({
      tags,
      activeTag,
      setActiveCategory,
      setActiveTag,
    }),
    [tags, activeTag, setActiveCategory, setActiveTag]
  );
  // TODO: add displayName to every component same as title prop of Example component
  // console.log(`> [COMPONENT: ${Comp.displayName}]`);

  return (
    <section className="pb-2">
      <TagsContext.Provider value={value}>
        <Comp />
      </TagsContext.Provider>
    </section>
  );
}
