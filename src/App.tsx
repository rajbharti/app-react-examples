import { useState } from "react";
import type { TagType, ActiveTagType, CompType } from "./types";
import TagsFilter from "./components/TagsFilter";
import RenderComp from "./components/RenderComp";
import UseStateEx from "./examples/use-state/UseStateEx";
import UseEffectEx from "./examples/use-effect/UseEffectEx";
import UseRefEx from "./examples/use-ref/UseRefEx";
import UseMemoEx from "./examples/use-memo/UseMemoEx";
import UseReducerCounter from "./examples/use-reducer/Counter";
import UseReducerTodo from "./examples/use-reducer/Todo";
import ReduxCounter from "./examples/redux/Counter";
import ReduxToolkitCounter from "./examples/redux-toolkit/Counter";

interface MapTagToCompsInterface {
  [index: string]: readonly CompType[];
}

export const mapTagToComps: MapTagToCompsInterface = {
  useState: [UseStateEx],
  useEffect: [UseEffectEx],
  useRef: [UseRefEx],
  // useCallback: [],
  useMemo: [UseMemoEx],
  // useContext: [UseReducerTodo],
  useReducer: [UseReducerCounter, UseReducerTodo],
  // "Custom Hooks": []
  // useId: [],
  "State Management with Hooks": [],
  Redux: [ReduxCounter],
  "Redux Toolkit": [ReduxToolkitCounter],
};

export default function App() {
  const [activeTag, setActiveTag] = useState<ActiveTagType>(null);
  const tags: TagType[] = Object.keys(mapTagToComps);

  return (
    <main>
      <h1>React Examples</h1>

      <TagsFilter
        tags={tags}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />

      {activeTag &&
        mapTagToComps[activeTag]?.map((Comp: CompType, i: number) => (
          <RenderComp
            key={activeTag + i.toString()}
            Comp={Comp}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />
        ))}
    </main>
  );
}
