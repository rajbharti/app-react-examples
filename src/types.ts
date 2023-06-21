export type Category = string;

export type Tag = string;

export type Comp = () => JSX.Element;

export type ActiveTag = Tag | null;

export type ActiveCategory = Category | null;

export interface TagsContextShape {
  compTags: Tag[];
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTag>>;
}
