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
  [key: Category]: Record<string, (Comp | Comp[])[]>;
}
/**
 * mapTagToComps = {
 *  category: {
 *    tag: [
 *      tag functionality occurs in own file component (actual component(s)),
 *      [ tag functionality occurs in other file component (ref components(s)) ]
 *    ]
 *  }
 * }
 */

/* 
TODO: Restructure it to display
1. only show own tag components
2. on ui shows, current components contains which all tag
*/
export const mapTagToComps: MapTagToComps = {
  hooks: {
    useState: [UseStateButtonToggle, UseStateChange],
    useReducer: [UseReducerCounter, UseReducerTodo],
    useEffect: [UseEffectFetchAPIAndLifeCycleMethods],
    useRef: [
      UseRefInputChangeButtonClick,
      [UseEffectFetchAPIAndLifeCycleMethods, MemoButtonClick],
    ],
    useMemo: [UseMemoInputChange],
    useCallback: [
      UseCallbackInputChange,
      [UseEffectFetchAPIAndLifeCycleMethods, UseStateChange],
    ],
    useTransition: [UseTransitionTabs],
  },
  apis: {
    memo: [
      MemoButtonClick,
      MemoInputChange,
      [UseCallbackInputChange, UseStateChange],
    ],
    forwardRef: [[UseReducerTodo]],
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
      <h1 className="mb-5 text-3xl font-bold ">TypeScript React Examples</h1>
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

      <hr className="mt-4" />

      {activeTag &&
        activeCategory &&
        mapTagToComps[activeCategory][activeTag]
          .flat()
          ?.map((Comp: Comp, i: number) => (
            <RenderComp
              key={activeTag + i.toString()}
              Comp={Comp}
              setActiveCategory={setActiveCategory}
              activeTag={activeTag}
              setActiveTag={setActiveTag}
            />
          ))}
    </main>
  );
}
