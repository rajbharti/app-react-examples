import clsx from "clsx";
import { useTagsContext } from "../context";
import type { Tag } from "../types";
import { getSelectedTagCategory } from "src/utils";

/* TODO:
 - If a tag's component is clicked, not only show the tag's component(s)
 but also the component which uses that tag in collapse manner
 - In tags count display total ref count
 */

export default function Tags() {
  const { tags, activeTag, setActiveCategory, setActiveTag } = useTagsContext();

  const uniqueTags = [activeTag, ...new Set(tags)];

  function handleClick(selectedTag: Tag) {
    const selectedCategory = getSelectedTagCategory(selectedTag);
    console.log(`[${selectedCategory?.toUpperCase()}: ${selectedTag}]`);

    setActiveCategory(selectedCategory);
    setActiveTag(selectedTag);
  }

  return uniqueTags.length > 0 ? (
    <span className="font-mono text-sm font-normal leading-4">
      {uniqueTags.map((tag) => {
        const attr =
          tag !== activeTag
            ? {
                onClick: () => handleClick(tag as string),
                title: `This example contains usage of ${tag}`,
              }
            : null;

        return (
          <span
            key={tag}
            {...attr}
            className={clsx(
              "mr-1.5 inline-block cursor-default rounded-full border px-1.5 py-0.5",
              tag === activeTag
                ? "border-slate-400 bg-slate-100 text-slate-600"
                : [
                    "cursor-pointer",
                    "border-purple-300 bg-purple-50 text-purple-500",
                    "hover:border-purple-400 hover:bg-purple-100 hover:text-purple-600",
                    "active:border-purple-500 active:bg-purple-200 active:text-purple-700",
                  ]
            )}
          >
            {tag}
          </span>
        );
      })}
    </span>
  ) : null;
}
