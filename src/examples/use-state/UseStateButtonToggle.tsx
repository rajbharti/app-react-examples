import { useState } from "react";
import clsx from "clsx";
import Example from "src/components/Example";

const filters: readonly string[] = ["All", "Active", "Completed"];

type Filter = (typeof filters)[number];

export default function UseStateButtonToggle() {
  const [activeFilter, setActiveFilter] = useState<Filter | null>(null);

  function handleClick(filter: Filter) {
    setActiveFilter((prevState) => (prevState === filter ? null : filter));
  }

  return (
    <Example hasNestedComp={false} title="Button Toggle">
      <div className="mb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleClick(filter)}
            className={clsx(
              "capitalize hover:border-yellow-700 hover:bg-yellow-300 hover:text-yellow-900 active:border-yellow-800 active:bg-yellow-400 active:text-yellow-950",
              activeFilter === filter &&
                "border-yellow-700 bg-yellow-300 text-yellow-900 "
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      <b>Selected Filter:</b> {activeFilter}
    </Example>
  );
}
