import { useMemo } from "react";
import type {
  ActiveTag,
  Comp,
  ActiveCategory,
  CompCategoryAndTags,
} from "../types";
import { getCompTags } from "../utils";
import { TagsContext } from "../context";

interface RenderCompProps {
  Comp: Comp;
  activeCategory: NonNullable<ActiveCategory>;
  setActiveCategory: React.Dispatch<React.SetStateAction<ActiveCategory>>;
  activeTag: NonNullable<ActiveTag>;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTag>>;
}

export default function RenderComp({
  Comp,
  activeCategory,
  setActiveCategory,
  activeTag,
  setActiveTag,
}: RenderCompProps) {
  const compTags: CompCategoryAndTags[] = getCompTags(
    Comp,
    activeCategory,
    activeTag
  );

  const value = useMemo(
    () => ({
      compTags,
      activeCategory,
      setActiveCategory,
      setActiveTag,
    }),
    [compTags, activeCategory, setActiveCategory, setActiveTag]
  );

  return (
    <section className="pb-2">
      <TagsContext.Provider value={value}>
        <Comp />
      </TagsContext.Provider>
    </section>
  );
}
