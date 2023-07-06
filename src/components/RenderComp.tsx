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

  return (
    <section className="pb-2">
      <TagsContext.Provider value={value}>
        <Comp />
      </TagsContext.Provider>
    </section>
  );
}
