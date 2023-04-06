import type { TagType, TagsInterface } from "../types";

export default function Tags({ tags }: TagsInterface) {
  return tags.length > 0 ? (
    <span className="tags">{tags.map((tag: TagType) => `#${tag} `)}</span>
  ) : null;
}
