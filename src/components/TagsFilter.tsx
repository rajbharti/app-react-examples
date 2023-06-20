import { useMemo } from "react";
import clsx from "clsx";
import type { TagType, ActiveTagType, FeatureCategoryLabel } from "../types";
import { getActiveTagCompsCount } from "../utils";

interface Props {
  label: FeatureCategoryLabel;
  tags: TagType[];
  activeTag: ActiveTagType;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagType>>;
}

type TagFilterProps = Omit<Props, "tags"> & {
  tag: TagType;
};

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
      className={clsx(
        "cursor-pointer rounded-full border  px-2 py-1 no-underline hover:border-orange-600 hover:bg-orange-500 hover:text-white",
        activeTag === tag
          ? "border-orange-600 bg-orange-500 text-white"
          : "border-slate-300 bg-slate-100"
      )}
    >
      {tag} ({count})
    </button>
  );
}

export default function TagsFilter({
  label,
  tags,
  activeTag,
  setActiveTag,
}: Props) {
  return (
    <div className="my-4">
      <span className="font-bold capitalize">{label}</span>:{" "}
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
