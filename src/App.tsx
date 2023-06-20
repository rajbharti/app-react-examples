import { useState } from "react";
import type {
  TagsCateoryLabel,
  TagType,
  ActiveTagType,
  CompType,
} from "./types";
import TagsCategory from "./components/TagsCategory";
import RenderComp from "./components/RenderComp";
// Hooks
import UseStateChange from "./examples/use-state/UseStateChange";
import UseReducerCounter from "./examples/use-reducer/Counter";
import UseReducerTodo from "./examples/use-reducer/Todo";
import UseEffectFetchAPIAndLifeCycleMethods from "./examples/use-effect/UseEffectFetchAPIAndLifeCycleMethods";
import UseRefInputChangeButtonClick from "./examples/use-ref/UseRefInputChangeButtonClick";
import UseMemoInputChange from "./examples/use-memo/UseMemoInputChange";
import UseCallbackInputChange from "./examples/use-callback/UseCallbackInputChange";
import UseTransitionTabs from "./examples/use-transition/UseTransitionTabs";
// APIs
import MemoInputChange from "./examples/memo/MemoInputChange";
import MemoButtonClick from "./examples/memo/MemoButtonClick";
// Components
// Redux
import ReduxToolkitCounter from "./examples/redux-toolkit/CounterApp";
import ReduxCounter from "./examples/redux/Counter";

interface MapTagToComps {
  [key: TagsCateoryLabel]: Record<string, CompType[]>;
}

export const mapTagToComps: MapTagToComps = {
  hooks: {
    useState: [UseStateChange],
    useReducer: [UseReducerCounter, UseReducerTodo],
    useEffect: [UseEffectFetchAPIAndLifeCycleMethods],
    useRef: [UseRefInputChangeButtonClick, MemoButtonClick],
    useMemo: [UseMemoInputChange],
    useCallback: [UseCallbackInputChange],
    useTransition: [UseTransitionTabs],
  },
  apis: {
    memo: [MemoButtonClick, MemoInputChange, UseCallbackInputChange],
  },
  components: {},
  redux: {
    "Redux Toolkit": [ReduxToolkitCounter],
    Redux: [ReduxCounter],
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
          <TagsCategory
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
