import { useMemo } from "react";
import clsx from "clsx";
import { filtersLogic, getFilterCount } from "./utils";
import type { FilterType, TodoInterface } from "./types";

interface FiltersPropsInterface {
  todos: TodoInterface[];
  activeFilter: FilterType;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

interface FilterPropsInterface extends FiltersPropsInterface {
  filter: FilterType;
}

function Filter({
  todos,
  filter,
  activeFilter,
  setActiveFilter,
}: FilterPropsInterface) {
  const count = useMemo(() => getFilterCount(todos, filter), [todos]);

  function handleClick(clickedFilter: FilterType) {
    setActiveFilter((prevState: FilterType) =>
      prevState === clickedFilter ? null : clickedFilter
    );
  }

  return (
    <button
      onClick={() => handleClick(filter)}
      className={clsx(activeFilter === filter && "active-filter")}
    >
      {filter} ({count})
    </button>
  );
}

export default function Filters(props: FiltersPropsInterface) {
  return (
    <div className="filters">
      Filters:{" "}
      {Object.keys(filtersLogic).map((filter: string) => (
        <Filter key={filter} {...props} filter={filter as FilterType} />
      ))}
    </div>
  );
}
