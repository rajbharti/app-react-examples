import { useState } from "react";
import Layout from "./components/Layout";
import TagsCategory from "./components/TagsCategory";
import RenderComp from "./components/RenderComp";
// Hooks
import UseStateChange from "./examples/use-state/UseStateChange";
import UseStateButtonToggle from "./examples/use-state/UseStateButtonToggle";
import UseReducerCounter from "./examples/use-reducer/Counter";
import UseReducerTodo from "./examples/use-reducer/Todo";
import UseEffectFetchAPIAndLifeCycleMethods from "./examples/use-effect/UseEffectFetchAPIAndLifeCycleMethods";
import UseRefInputChangeButtonClick from "./examples/use-ref/UseRefInputChangeButtonClick";
import UseRefStopWatch from "./examples/use-ref/UseRefStopWatch";
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

import type {
  TagList,
  Category,
  ActiveTag,
  ActiveCategory,
  Comp,
} from "./types";
import UseEffectListeningToGlobalEvents from "./examples/use-effect/UseEffectListeningToGlobalEvents";

/* TODO: following type can be, but require lot of refactoring
interface MapTagToComps {
  [key: Category]: Partial<Record<TagList, [Comp, TagList[]?][]>>;
}
*/

interface MapTagToComps {
  [key: Category]: Record<string, [Comp, TagList[]?][]>;
}

/**
 * mapTagToComps = {
 *  category: {
 *    tag: [ [Component, [this Component also uses tags]] ]
 *  }
 * }
 */

export const mapTagToComps: MapTagToComps = {
  hooks: {
    useState: [
      [UseStateButtonToggle],
      [UseStateChange, ["useCallback", "memo", "useEffect", "useRef"]],
    ],
    useReducer: [
      [UseReducerCounter],
      [
        UseReducerTodo,
        ["useState", "useRef", "useEffect", "useMemo", "forwardRef"],
      ],
    ],
    useEffect: [
      [UseEffectListeningToGlobalEvents, ["useState", "useRef"]],
      [
        UseEffectFetchAPIAndLifeCycleMethods,
        ["useState", "useReducer", "useRef", "useCallback"],
      ],
    ],
    useRef: [
      [UseRefInputChangeButtonClick, ["useState", "useEffect"]],
      [UseRefStopWatch, ["useState"]],
    ],
    useMemo: [[UseMemoInputChange, ["useState", "useRef", "useEffect"]]],
    useCallback: [
      [UseCallbackInputChange, ["useState", "useRef", "useEffect", "memo"]],
    ],
    useTransition: [[UseTransitionTabs, ["useState"]]],
  },
  apis: {
    memo: [
      [MemoButtonClick, ["useState", "useRef"]],
      [MemoInputChange, ["useState", "useRef", "useEffect"]],
    ],
    forwardRef: [],
  },
  redux: {
    "Redux Toolkit": [[ReduxToolkitCounter]],
    Redux: [[ReduxCounter]],
  },
};

export default function App() {
  const [activeTag, setActiveTag] = useState<ActiveTag>(null);
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>(null);
  const categories: readonly string[] = Object.keys(mapTagToComps);

  return (
    <Layout>
      {categories.map((category: string) => {
        const tags: TagList[] = Object.keys(
          mapTagToComps[category]
        ) as TagList[];

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
        mapTagToComps[activeCategory][activeTag].map(
          ([Comp, tags], i: number) => (
            <RenderComp
              key={activeTag + i.toString()}
              Comp={Comp}
              tags={tags ?? []}
              setActiveCategory={setActiveCategory}
              activeTag={activeTag}
              setActiveTag={setActiveTag}
            />
          )
        )}
    </Layout>
  );
}
