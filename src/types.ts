export type TagsCateoryLabel = string;

export type TagType = string;

export type CompType = () => JSX.Element;

export type ActiveTagType = TagType | null;

export interface TagsContextShape {
  compTags: TagType[];
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagType>>;
}
