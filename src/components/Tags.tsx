import clsx from "clsx";
import { useTagsContext } from "../context";
import type { Category, CompCategoryAndTags, Tag } from "../types";

export default function Tags() {
  const { compTags, activeTag, setActiveCategory, setActiveTag } =
    useTagsContext();

  function handleClick(category: Category, tag: Tag) {
    setActiveCategory(category);
    setActiveTag(tag);
  }

  return compTags.length > 0 ? (
    <span className="font-mono text-sm font-normal leading-4">
      {compTags.map(({ category, tag, ownTagComp }: CompCategoryAndTags) => {
        const attr =
          tag !== activeTag
            ? {
                onClick: () => handleClick(category, tag),
              }
            : null;

        const className = [];
        if (tag === activeTag) {
          if (ownTagComp) {
            className.push("border-slate-500 bg-slate-200 text-slate-700");
          } else {
            className.push("border-slate-400 bg-slate-100 text-slate-600");
          }
        } else {
          if (ownTagComp) {
            className.push(
              "cursor-pointer",
              "border-purple-400 bg-purple-200 text-purple-600",
              "hover:border-purple-500 hover:bg-purple-300 hover:text-purple-700",
              "active:border-purple-600 active:bg-purple-400 active:text-purple-800"
            );
          } else {
            className.push(
              "cursor-pointer",
              "border-purple-300 bg-purple-50 text-purple-500",
              "hover:border-purple-400 hover:bg-purple-100 hover:text-purple-600",
              "active:border-purple-500 active:bg-purple-200 active:text-purple-700"
            );
          }
        }

        return (
          <span
            key={tag}
            {...attr}
            className={clsx(
              "mr-1.5 inline-block cursor-default rounded-full border px-1.5 py-0.5",
              className
            )}
          >
            {tag}
          </span>
        );
      })}
    </span>
  ) : null;
}
