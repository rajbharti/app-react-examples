import { useMemo } from "react";
import type { Tag, ActiveTag, Comp } from "../types";
import { getCompTags } from "../utils";
import { TagsContext } from "../context";

interface RenderCompProps {
  Comp: Comp;
  activeTag: NonNullable<ActiveTag>;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTag>>;
}

export default function RenderComp({
  Comp,
  activeTag,
  setActiveTag,
}: RenderCompProps) {
  const compTags: Tag[] = getCompTags(Comp, activeTag);

  const value = useMemo(
    () => ({
      compTags,
      setActiveTag,
    }),
    [compTags, setActiveTag]
  );

  return (
    <section className="pb-2">
      <TagsContext.Provider value={value}>
        <Comp />
      </TagsContext.Provider>
    </section>
  );
}
