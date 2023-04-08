import { useTagsContext } from "../context";
import type { TagType } from "../types";

export default function Tags() {
  const { compTags, setActiveTag } = useTagsContext();

  return compTags.length > 0 ? (
    <span className="tags">
      {compTags.map((tag: TagType) => (
        <span key={tag} onClick={() => setActiveTag(tag)}>
          #{tag}{" "}
        </span>
      ))}
    </span>
  ) : null;
}
