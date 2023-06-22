import { useMemo } from "react";
import clsx from "clsx";
import { filtersLogic, getFilterCount } from "./utils";
import type { TodosFilter, TodoShape } from "./types";

interface FilterProps extends Props {
  filter: TodosFilter;
}

function Filter({ todos, filter, activeFilter, setActiveFilter }: FilterProps) {
  const count = useMemo(() => getFilterCount(todos, filter), [todos]);

  function handleClick(selectedFilter: TodosFilter) {
    setActiveFilter((prevActiveFilter: TodosFilter) =>
      prevActiveFilter === selectedFilter ? null : selectedFilter
    );
  }

  return (
    <button
      onClick={() => handleClick(filter)}
      className={clsx(
        "capitalize hover:border-yellow-700 hover:bg-yellow-300 hover:text-yellow-900 active:border-yellow-800 active:bg-yellow-400 active:text-yellow-950",
        activeFilter === filter &&
          "border-yellow-700 bg-yellow-300 text-yellow-900"
      )}
    >
      {filter} ({count})
    </button>
  );
}

interface Props {
  todos: TodoShape[];
  activeFilter: TodosFilter;
  setActiveFilter: React.Dispatch<React.SetStateAction<TodosFilter>>;
}

export default function Filters(props: Props) {
  return (
    <div className="mb-2 mt-1 text-sm">
      <span className="mr-1 font-bold">Filters:</span>
      {Object.keys(filtersLogic).map((filter: string) => (
        <Filter key={filter} {...props} filter={filter as TodosFilter} />
      ))}
    </div>
  );
}
