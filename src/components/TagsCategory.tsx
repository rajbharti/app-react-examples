import { useMemo } from "react";
import clsx from "clsx";
import type { Tag, ActiveTag, Category, ActiveCategory } from "../types";
import { getActiveTagCompsCount } from "../utils";

interface Props {
  category: Category;
  setActiveCategory: React.Dispatch<React.SetStateAction<ActiveTag>>;
  tags: Tag[];
  activeTag: ActiveTag;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveCategory>>;
}

type TagFilterProps = Omit<Props, "tags"> & {
  tag: Tag;
};

function TagCategory({
  category,
  setActiveCategory,
  tag,
  activeTag,
  setActiveTag,
}: TagFilterProps) {
  const count = useMemo(
    () => getActiveTagCompsCount(category, tag),
    [category, tag]
  );
  function handleTagClick(clickedTag: Tag) {
    setActiveCategory(category);
    setActiveTag((prevState: ActiveTag) =>
      prevState === clickedTag ? null : clickedTag
    );
  }

  return (
    <button
      onClick={() => handleTagClick(tag)}
      className={clsx(
        "cursor-pointer rounded-full border px-2 py-1 leading-4 no-underline hover:border-orange-600 hover:bg-orange-200 hover:text-orange-900 active:bg-orange-300 active:text-orange-950",
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
  const { category, tags } = props;

  return (
    <div className="my-2.5">
      <span className="text-base font-bold capitalize text-orange-700">
        {category}
      </span>
      :{" "}
      {tags.map((tag: Tag) => (
        <TagCategory key={tag} tag={tag} {...props} />
      ))}
    </div>
  );
}
