import { useTagsContext } from "../context";
import type { Tag } from "../types";

export default function Tags() {
  const { compTags, setActiveTag } = useTagsContext();

  return compTags.length > 0 ? (
    <span className="font-mono text-sm font-normal leading-4 text-purple-500">
      {compTags.map((tag: Tag) => (
        <span
          key={tag}
          onClick={() => setActiveTag(tag)}
          className="mr-1.5 inline-block cursor-pointer rounded-full border border-purple-300 bg-purple-50 px-1.5 py-0.5 hover:border-purple-400 hover:bg-purple-200 hover:text-purple-700"
        >
          {tag}
        </span>
      ))}
    </span>
  ) : null;
}
