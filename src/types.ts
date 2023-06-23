export type Category = string;

export type Tag = string;

export type Comp = () => JSX.Element;

export type ActiveTag = Tag | null;

export type ActiveCategory = Category | null;

export interface TagsContextShape {
  compTags: { category: string; tag: string }[];
  activeCategory: ActiveCategory;
  setActiveCategory: React.Dispatch<React.SetStateAction<ActiveCategory>>;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTag>>;
}

export type CompCategoryAndTags = TagsContextShape["compTags"][number];
