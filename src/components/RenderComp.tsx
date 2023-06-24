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
  setActiveCategory: React.Dispatch<React.SetStateAction<ActiveCategory>>;
  activeTag: NonNullable<ActiveTag>;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTag>>;
}

export default function RenderComp({
  Comp,
  setActiveCategory,
  activeTag,
  setActiveTag,
}: RenderCompProps) {
  // TODO: sort tags by active tag
  const compTags: CompCategoryAndTags[] = [...getCompTags(Comp)];

  const value = useMemo(
    () => ({
      compTags,
      activeTag,
      setActiveCategory,
      setActiveTag,
    }),
    [compTags, activeTag, setActiveCategory, setActiveTag]
  );

  return (
    <section className="pb-2">
      <TagsContext.Provider value={value}>
        <Comp />
      </TagsContext.Provider>
    </section>
  );
}
