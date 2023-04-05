import { useState } from "react";
import clsx from "clsx";
import Counter from "./components/Counter";
import Todo from "./components/Todo";

interface ComponentMappingInterface {
  [index: string]: (() => JSX.Element)[];
}

type ActiveTagType = string | null;

const tags: string[] = ["useState", "useReducer", "useRef"];

const componentMapping: ComponentMappingInterface = {
  useState: [Todo],
  useReducer: [Counter, Todo],
  useRef: [Todo],
};

interface TagsPropsInterface {
  activeTag: ActiveTagType;
  setActiveTag: React.Dispatch<React.SetStateAction<ActiveTagType>>;
}

function Tags({ activeTag, setActiveTag }: TagsPropsInterface) {
  function handleTagClick(selectedTag: string) {
    setActiveTag((prevState: ActiveTagType) => {
      return prevState === selectedTag ? null : selectedTag;
    });
  }

  function getTagsCount(tag: string) {
    return componentMapping[tag]?.length || 0;
  }

  return (
    <div className="tags">
      Tags:{" "}
      {tags.map((tag: string) => (
        <button
          key={tag.toString()}
          onClick={() => handleTagClick(tag)}
          className={clsx(activeTag === tag && "active-tag")}
        >
          {tag} ({getTagsCount(tag)})
        </button>
      ))}
    </div>
  );
}

function App() {
  const [activeTag, setActiveTag] = useState<ActiveTagType>(null);

  return (
    <main>
      <h1>React Examples</h1>
      <Tags activeTag={activeTag} setActiveTag={setActiveTag} />

      {activeTag &&
        componentMapping[activeTag]?.map(
          (Comp: () => JSX.Element, i: number) => (
            <>
              <Comp key={`${activeTag}${i.toString()}`} />
              <hr />
            </>
          )
        )}
    </main>
  );
}

export default App;
