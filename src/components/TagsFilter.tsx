import { useMemo } from "react";
import clsx from "clsx";
import type { TagType, ActiveTagType } from "../types";
import { getActiveTagCompsCount } from "../utils";

interface TagFilterPropsInterface {
  tag: TagType;
  activeTag: ActiveTagType;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagType>>;
}

function TagFilter({ tag, activeTag, setActiveTag }: TagFilterPropsInterface) {
  const count = useMemo(() => getActiveTagCompsCount(tag), [tag]);

  function handleTagClick(clickedTag: TagType) {
    setActiveTag((prevState: ActiveTagType) => {
      return prevState === clickedTag ? null : clickedTag;
    });
  }

  return (
    <button
      key={tag}
      onClick={() => handleTagClick(tag)}
      className={clsx(activeTag === tag && "active-tag")}
    >
      {tag} ({count})
    </button>
  );
}

interface TagsFilterPropsInterface {
  tags: TagType[];
  activeTag: ActiveTagType;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagType>>;
}

export default function TagsFilter({
  tags,
  activeTag,
  setActiveTag,
}: TagsFilterPropsInterface) {
  return (
    <div className="tags-filter">
      <b>Tags</b>:{" "}
      {tags.map((tag: TagType) => (
        <TagFilter
          key={tag}
          tag={tag}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        />
      ))}
      <hr />
    </div>
  );
}
