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
import UseReducerCounter from "./examples/use-reducer/Counter";
import UseReducerTodo from "./examples/use-reducer/Todo";
import UseRefEx from "./examples/use-ref/UseRefEx";
import UseEffectEx from "./examples/use-effect/UseEffectEx";
import UseMemoEx from "./examples/use-memo/UseMemoEx";
import UseCallbackEx from "./examples/use-callback/UseCallbackEx";
import UseTransitionEx from "./examples/use-transition/UseTransitionEx";
import ReduxCounter from "./examples/redux/Counter";
import ReduxToolkitCounter from "./examples/redux-toolkit/CounterApp";
import MemoInputChange from "./examples/memo/MemoInputChange";
import MemoButtonClick from "./examples/memo/MemoButtonClick";

interface MapTagToComps {
  [key: FeatureCategoryLabel]: Record<string, CompType[]>;
}

export const mapTagToComps: MapTagToComps = {
  hooks: {
    useState: [UseStateEx],
    useReducer: [UseReducerCounter, UseReducerTodo],
    // useContext: [],
    useRef: [UseRefEx],
    useEffect: [UseEffectEx],
    useMemo: [UseMemoEx],
    useCallback: [UseCallbackEx],
    useTransition: [UseTransitionEx],
    // "Custom Hooks": []
    // useId: [],
    // "State Management with Hooks": [],
  },
  apis: {
    memo: [MemoButtonClick, MemoInputChange, UseCallbackEx],
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

      {/* Todo: optimize below: store category in state along with activeTag */}
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
