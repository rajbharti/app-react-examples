import { Fragment, useState } from "react";
import type { ActiveTagsFilterType, CompType } from "./types";
import { getComponentTags } from "./utils";
import TagsFilter from "./components/TagsFilter";
import Counter from "./examples/Counter";
import Todo from "./examples/Todo";

interface MapTagToCompsInterface {
  [index: string]: CompType[];
}

export const mapTagToComps: MapTagToCompsInterface = {
  useState: [Todo],
  useEffect: [Todo],
  useReducer: [Counter, Todo],
  useRef: [Todo],
  useMemo: [Todo],
};

function App() {
  const [activeTag, setActiveTag] = useState<ActiveTagsFilterType>(null);

  return (
    <main>
      <h1>React Examples</h1>
      <TagsFilter activeTag={activeTag} setActiveTag={setActiveTag} />

      {activeTag &&
        mapTagToComps[activeTag]?.map((Comp: CompType, i: number) => {
          const tags = getComponentTags(Comp);

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
