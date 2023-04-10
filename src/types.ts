export type FeatureCategoryLabel = string;
export type TagType = string;

export type CompType = () => JSX.Element;

export type ActiveTagType = TagType | null;

export interface TagsContextInterface {
  compTags: TagType[];
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagType>>;
}
