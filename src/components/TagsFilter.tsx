import clsx from "clsx";
import type { TagType, ActiveTagType } from "../types";
import { getActiveTagCompsCount } from "../utils";

interface TagsPropsInterface {
  tags: TagType[];
  activeTag: ActiveTagType;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagType>>;
}

export default function TagsFilter({
  tags,
  activeTag,
  setActiveTag,
}: TagsPropsInterface) {
  function handleTagClick(clickedTag: TagType) {
    setActiveTag((prevState: ActiveTagType) => {
      return prevState === clickedTag ? null : clickedTag;
    });
  }

  return (
    <div className="tags-filter">
      <b>Tags</b>:{" "}
      {tags.map((tag: TagType) => (
        <button
          key={tag.toString()}
          onClick={() => handleTagClick(tag)}
          className={clsx(activeTag === tag && "active-tag")}
        >
          {tag} ({getActiveTagCompsCount(tag)})
        </button>
      ))}
      <hr />
    </div>
  );
}
