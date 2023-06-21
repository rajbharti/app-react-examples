import { useMemo } from "react";
import clsx from "clsx";
import { filtersLogic, getFilterCount } from "./utils";
import type { TodosFilter, TodoShape } from "./types";

interface FilterProps extends Props {
  filter: TodosFilter;
}

function Filter({ todos, filter, activeFilter, setActiveFilter }: FilterProps) {
  const count = useMemo(() => getFilterCount(todos, filter), [todos]);

  function handleClick(clickedFilter: TodosFilter) {
    setActiveFilter((prevState: TodosFilter) =>
      prevState === clickedFilter ? null : clickedFilter
    );
  }

  return (
    <button
      onClick={() => handleClick(filter)}
      className={clsx(
        "capitalize hover:border-yellow-700 hover:bg-yellow-300 hover:text-yellow-900",
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
      Filters:{" "}
      {Object.keys(filtersLogic).map((filter: string) => (
        <Filter key={filter} {...props} filter={filter as TodosFilter} />
      ))}
    </div>
  );
}
