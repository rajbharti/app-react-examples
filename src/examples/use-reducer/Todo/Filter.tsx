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
  function handleClick(clickedFilter: FilterType) {
    setActiveFilter((prevState: FilterType) =>
      prevState === clickedFilter ? null : clickedFilter
    );
  }

  function getFilterCount(filter: FilterType) {
    return filter ? todos.filter(FILTERS_LOGIC[filter]).length : 0;
  }

  return (
    <div className="filter">
      Filter:{" "}
      {Object.keys(FILTERS_LOGIC).map((filter: string) => (
        <button
          key={filter.toString()}
          onClick={() => handleClick(filter as FilterType)}
          className={clsx(activeFilter === filter && "active-filter")}
        >
          {filter} ({getFilterCount(filter as FilterType)})
        </button>
      ))}
    </div>
  );
}
