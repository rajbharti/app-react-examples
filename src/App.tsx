import { useState } from "react";
import type { TagType, ActiveTagType, CompType } from "./types";
import { getCompTags } from "./utils";
import { TagsContext } from "./context";
import TagsFilter from "./components/TagsFilter";
import ReducerCounter from "./examples/use-reducer/Counter";
import ReducerTodo from "./examples/use-reducer/Todo";
import ReduxCounter from "./examples/redux/Counter";
import ReduxToolkitCounter from "./examples/redux-toolkit/Counter";

interface MapTagToCompsInterface {
  [index: string]: readonly CompType[];
}

export const mapTagToComps: MapTagToCompsInterface = {
  // useState: [],
  // useEffect: [],
  useReducer: [ReducerCounter, ReducerTodo],
  // useContext: [],
  useMemo: [ReducerTodo],
  // useCallback: [],
  // useId: [],
  // "Custom Hooks": []
  "State Management with Hooks": [],
  "Redux - Deprecated": [ReduxCounter],
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
        mapTagToComps[activeTag]?.map((Comp: CompType, i: number) => {
          const compTags: TagType[] = getCompTags(Comp, activeTag);

          return (
            <section key={activeTag + i.toString()}>
              <TagsContext.Provider value={{ compTags, setActiveTag }}>
                <Comp />
              </TagsContext.Provider>
              <hr />
            </section>
          );
        })}
    </main>
  );
}
