import { useState } from "react";
import type { TagType, ActiveTagType, CompType } from "./types";
import { getCompTags } from "./utils";
import TagsFilter from "./components/TagsFilter";
import ReducerCounter from "./examples/use-reducer/Counter";
import ReducerTodo from "./examples/use-reducer/Todo";
import ReduxCounter from "./examples/redux/Counter";
import ReduxToolkitCounter from "./examples/redux-toolkit/Counter";

interface MapTagToCompsInterface {
  [index: string]: readonly CompType[];
}

export const mapTagToComps: MapTagToCompsInterface = {
  useState: [],
  useEffect: [],
  useReducer: [ReducerCounter, ReducerTodo],
  useContext: [],
  useMemo: [ReducerTodo],
  "Redux - Deprecated": [ReduxCounter],
  "Redux Toolkit": [ReduxToolkitCounter],
  "State Management with Hooks": [],
};

function App() {
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
          const tags: TagType[] = getCompTags(Comp);

          return (
            <section key={`${activeTag}${i.toString()}`}>
              <Comp tags={tags} />
              <hr />
            </section>
          );
        })}
    </main>
  );
}

export default App;
