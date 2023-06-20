import { useMemo } from "react";
import clsx from "clsx";
import { filtersLogic, getFilterCount } from "./utils";
import type { FilterUnion, TodoShape } from "./types";

interface FilterProps extends Props {
  filter: FilterUnion;
}

function Filter({ todos, filter, activeFilter, setActiveFilter }: FilterProps) {
  const count = useMemo(() => getFilterCount(todos, filter), [todos]);

  function handleClick(clickedFilter: FilterUnion) {
    setActiveFilter((prevState: FilterUnion) =>
      prevState === clickedFilter ? null : clickedFilter
    );
  }

  return (
    <button
      onClick={() => handleClick(filter)}
      className={clsx(
        "capitalize",
        activeFilter === filter && "bg-[#7fff00] hover:bg-[#7fff00]"
      )}
    >
      {filter} ({count})
    </button>
  );
}

interface Props {
  todos: TodoShape[];
  activeFilter: FilterUnion;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterUnion>>;
}

export default function Filters(props: Props) {
  return (
    <div className="mb-2 mt-1 text-sm">
      Filters:{" "}
      {Object.keys(filtersLogic).map((filter: string) => (
        <Filter key={filter} {...props} filter={filter as FilterUnion} />
      ))}
    </div>
  );
}
