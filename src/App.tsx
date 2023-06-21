import { useState } from "react";
import type { Category, Tag, ActiveTag, ActiveCategory, Comp } from "./types";
import TagsCategory from "./components/TagsCategory";
import RenderComp from "./components/RenderComp";
// Hooks
import UseStateChange from "./examples/use-state/UseStateChange";
import UseStateButtonToggle from "./examples/use-state/UseStateButtonToggle";
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
  [key: Category]: Record<string, Comp[]>;
}

export const mapTagToComps: MapTagToComps = {
  hooks: {
    useState: [UseStateChange, UseStateButtonToggle],
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
  const [activeTag, setActiveTag] = useState<ActiveTag>(null);
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>(null);
  const categories: readonly string[] = Object.keys(mapTagToComps);

  return (
    <main>
      <h1>React Examples</h1>
      {categories.map((category: string) => {
        const tags: Tag[] = Object.keys(mapTagToComps[category]);

        return (
          <TagsCategory
            key={category}
            category={category}
            setActiveCategory={setActiveCategory}
            tags={tags}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />
        );
      })}

      <hr />

      {activeTag &&
        activeCategory &&
        mapTagToComps[activeCategory][activeTag]?.map(
          (Comp: Comp, i: number) => (
            <RenderComp
              key={activeTag + i.toString()}
              Comp={Comp}
              activeTag={activeTag}
              setActiveTag={setActiveTag}
            />
          )
        )}
    </main>
  );
}
