import { useState } from "react";
import clsx from "clsx";
import Example from "src/components/Example";

const filters: readonly string[] = ["All", "Active", "Completed"];

type Filter = (typeof filters)[number];

export default function UseStateButtonToggle() {
  const [activeFilter, setActiveFilter] = useState<Filter | null>(null);

  function handleClick(selectedFilter: Filter) {
    setActiveFilter(activeFilter === selectedFilter ? null : selectedFilter);
  }

  return (
    <Example hideParentCompLabel title="Button Toggle">
      <div className="mb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleClick(filter)}
            className={clsx("btn-primary", activeFilter === filter && "active")}
          >
            {filter}
          </button>
        ))}
      </div>
      <b>Selected Filter:</b> {activeFilter}
    </Example>
  );
}
