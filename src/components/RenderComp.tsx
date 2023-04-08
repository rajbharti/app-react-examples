import { useMemo } from "react";
import type { TagType, ActiveTagType, CompType } from "../types";
import { getCompTags } from "../utils";
import { TagsContext } from "../context";

interface PropsInterface {
  Comp: CompType;
  activeTag: NonNullable<ActiveTagType>;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagType>>;
}

export default function RenderComp({
  Comp,
  activeTag,
  setActiveTag,
}: PropsInterface) {
  const compTags: TagType[] = getCompTags(Comp, activeTag);

  const value = useMemo(
    () => ({
      compTags,
      setActiveTag,
    }),
    [compTags, setActiveTag]
  );

  return (
    <section>
      <TagsContext.Provider value={value}>
        <Comp />
      </TagsContext.Provider>
      <hr />
    </section>
  );
}
