import clsx from "clsx";
import type { TagsFilterType, ActiveTagsFilterType } from "../types";
import { mapTagToComps } from "../App";

interface TagsPropsInterface {
  activeTag: ActiveTagsFilterType;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagsFilterType>>;
}

const tags: Set<TagsFilterType> = new Set([
  "useState",
  "useEffect",
  "useReducer",
  "useRef",
  "useMemo",
]);

export default function TagsFilter({
  activeTag,
  setActiveTag,
}: TagsPropsInterface) {
  function handleTagClick(clickedTag: TagsFilterType) {
    setActiveTag((prevState: ActiveTagsFilterType) => {
      return prevState === clickedTag ? null : clickedTag;
    });
  }

  function getTagsCount(tag: TagsFilterType) {
    return mapTagToComps[tag]?.length || 0;
  }

  return (
    <div className="tags-filter">
      Tags:{" "}
      {[...tags].map((tag: TagsFilterType) => (
        <button
          key={tag.toString()}
          onClick={() => handleTagClick(tag)}
          className={clsx(activeTag === tag && "active-tag")}
        >
          {tag} ({getTagsCount(tag)})
        </button>
      ))}
    </div>
  );
}
