import clsx from "clsx";
import { FILTERS_LOGIC } from "./utils";
import type { FilterType, TodoInterface } from "./types";

interface PropsInterface {
  activeFilter: FilterType;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  todos: TodoInterface[];
}

export default function Filter({
  activeFilter,
  setActiveFilter,
  todos,
}: PropsInterface) {
  function handleClick(selectedFilter: FilterType) {
    setActiveFilter((prevState: FilterType) =>
      prevState === selectedFilter ? null : selectedFilter
    );
  }

  function getFilterCount(selectedFilter: FilterType) {
    return selectedFilter
      ? todos.filter(FILTERS_LOGIC[selectedFilter]).length
      : 0;
  }

  return (
    <div className="filter">
      Filter:{" "}
      {Object.keys(FILTERS_LOGIC).map((key: string) => (
        <button
          key={key.toString()}
          onClick={() => handleClick(key as FilterType)}
          className={clsx(activeFilter === key && "active-filter")}
        >
          {key} ({getFilterCount(key as FilterType)})
        </button>
      ))}
    </div>
  );
}
