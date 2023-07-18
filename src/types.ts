export type TagList =
  | "useState"
  | "useReducer"
  | "useEffect"
  | "useRef"
  | "useMemo"
  | "useCallback"
  | "useTransition"
  | "memo"
  | "forwardRef"
  | "Redux Toolkit"
  | "Redux";

export type Category = string;

export type Tag = string;

export type Comp = () => JSX.Element;

export type ActiveTag = Tag | null;

export type ActiveCategory = Category | null;

export interface TagsContextShape {
  tags: TagList[];
  activeTag: ActiveTag;
  setActiveCategory: React.Dispatch<React.SetStateAction<ActiveCategory>>;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTag>>;
}

export type ExampleLevel = number;
