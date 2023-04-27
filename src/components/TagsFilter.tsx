import { useMemo } from "react";
import clsx from "clsx";
import type { TagType, ActiveTagType, FeatureCategoryLabel } from "../types";
import { getActiveTagCompsCount } from "../utils";

interface TagFilterProps {
  label: FeatureCategoryLabel;
  tag: TagType;
  activeTag: ActiveTagType;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagType>>;
}

function TagFilter({ label, tag, activeTag, setActiveTag }: TagFilterProps) {
  const count = useMemo(() => getActiveTagCompsCount(label, tag), [label, tag]);

  function handleTagClick(clickedTag: TagType) {
    setActiveTag((prevState: ActiveTagType) => {
      return prevState === clickedTag ? null : clickedTag;
    });
  }

  return (
    <button
      onClick={() => handleTagClick(tag)}
      className={clsx(activeTag === tag && "active-tag")}
    >
      {tag} ({count})
    </button>
  );
}

interface TagsFilterProps {
  label: FeatureCategoryLabel;
  tags: TagType[];
  activeTag: ActiveTagType;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagType>>;
}

export default function TagsFilter({
  label,
  tags,
  activeTag,
  setActiveTag,
}: TagsFilterProps) {
  return (
    <div className="tags-filter">
      <span className="tags-label">{label}</span>:{" "}
      {tags.map((tag: TagType) => (
        <TagFilter
          key={tag}
          label={label}
          tag={tag}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        />
      ))}
    </div>
  );
}
