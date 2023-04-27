import { useState } from "react";
import type {
  FeatureCategoryLabel,
  TagType,
  ActiveTagType,
  CompType,
} from "./types";
import TagsFilter from "./components/TagsFilter";
import RenderComp from "./components/RenderComp";
import UseStateEx from "./examples/use-state/UseStateEx";
import UseEffectEx from "./examples/use-effect/UseEffectEx";
import UseRefEx from "./examples/use-ref/UseRefEx";
import UseMemoEx from "./examples/use-memo/UseMemoEx";
import UseCallbackEx from "./examples/use-callback/UseCallbackEx";
import UseReducerCounter from "./examples/use-reducer/Counter";
import UseReducerTodo from "./examples/use-reducer/Todo";
import ReduxCounter from "./examples/redux/Counter";
import ReduxToolkitCounter from "./examples/redux-toolkit/CounterApp";
import MemoEx from "./examples/memo/MemoEx";

interface MapTagToComps {
  [index: FeatureCategoryLabel]: Record<string, CompType[]>;
}

export const mapTagToComps: MapTagToComps = {
  hooks: {
    useState: [UseStateEx],
    useEffect: [UseEffectEx],
    useRef: [UseRefEx],
    useMemo: [UseMemoEx],
    useCallback: [UseCallbackEx],
    // useContext: [],
    useReducer: [UseReducerCounter, UseReducerTodo],
    // "Custom Hooks": []
    // useId: [],
    "State Management with Hooks": [],
  },
  apis: {
    memo: [MemoEx, UseCallbackEx],
  },
  components: {},
  redux: {
    Redux: [ReduxCounter],
    "Redux Toolkit": [ReduxToolkitCounter],
  },
};

export default function App() {
  const [activeTag, setActiveTag] = useState<ActiveTagType>(null);
  const categories: string[] = Object.keys(mapTagToComps);

  return (
    <main>
      <h1>React Examples</h1>
      {categories.map((category: string) => {
        const tags: TagType[] = Object.keys(mapTagToComps[category]);

        return (
          <TagsFilter
            key={category}
            label={category}
            tags={tags}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />
        );
      })}
      <hr />

      {categories.map(
        (category: string) =>
          activeTag &&
          mapTagToComps[category][activeTag]?.map(
            (Comp: CompType, i: number) => (
              <RenderComp
                key={activeTag + i.toString()}
                Comp={Comp}
                activeTag={activeTag}
                setActiveTag={setActiveTag}
              />
            )
          )
      )}
    </main>
  );
}
