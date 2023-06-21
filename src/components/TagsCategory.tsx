import { useMemo } from "react";
import clsx from "clsx";
import type { TagType, ActiveTagType, TagsCategoryLabel } from "../types";
import { getActiveTagCompsCount } from "../utils";

interface Props {
  label: TagsCategoryLabel;
  tags: TagType[];
  activeTag: ActiveTagType;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagType>>;
}

type TagFilterProps = Omit<Props, "tags"> & {
  tag: TagType;
};

function TagCategory({ label, tag, activeTag, setActiveTag }: TagFilterProps) {
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
        "hover:text-orange-900hover:border-orange-600 cursor-pointer rounded-full  border px-2 py-1 no-underline hover:border-orange-600 hover:bg-orange-200 hover:bg-orange-200 hover:text-orange-900",
        activeTag === tag
          ? "border-orange-600 bg-orange-200 text-orange-900"
          : "border-slate-300 bg-slate-100"
      )}
    >
      {tag} ({count})
    </button>
  );
}

export default function TagsCategory(props: Props) {
  const { label, tags } = props;

  return (
    <div className="my-4">
      <span className="text-base font-bold capitalize text-orange-700">
        {label}
      </span>
      :{" "}
      {tags.map((tag: TagType) => (
        <TagCategory key={tag} tag={tag} {...props} />
      ))}
    </div>
  );
}
