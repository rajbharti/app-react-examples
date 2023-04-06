export type TagType = string;

export interface TagsInterface {
  tags: TagType[];
}

export type CompType = (props: TagsInterface) => JSX.Element;

export type ActiveTagType = TagType | null;
