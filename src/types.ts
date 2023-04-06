export type TagsFilterType = string;

export interface TagsInterface {
  tags: TagsFilterType[];
}

export type CompType = (props: TagsInterface) => JSX.Element;

export type ActiveTagsFilterType = TagsFilterType | null;
