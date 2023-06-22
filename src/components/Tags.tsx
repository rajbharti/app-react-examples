import { useTagsContext } from "../context";
import type { Category, CompCategoryAndTags, Tag } from "../types";

export default function Tags() {
  const { compTags, setActiveCategory, setActiveTag } = useTagsContext();

  function handleClick(category: Category, tag: Tag) {
    setActiveCategory(category);
    setActiveTag(tag);
  }

  return compTags.length > 0 ? (
    <span className="font-mono text-sm font-normal leading-4 ">
      {compTags.map(({ category, tag }: CompCategoryAndTags) => (
        <span
          key={tag}
          onClick={() => handleClick(category, tag)}
          className="mr-1.5 inline-block cursor-pointer rounded-full border border-purple-300 bg-purple-50 px-1.5 py-0.5 text-purple-500 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-600 active:border-purple-500 active:bg-purple-200 active:text-purple-700"
        >
          {tag}
        </span>
      ))}
    </span>
  ) : null;
}
