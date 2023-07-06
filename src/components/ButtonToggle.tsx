import { memo, useState } from "react";
import clsx from "clsx";

type Label = string;

interface Props {
  labels: readonly Label[];
  onClick(label: Label | null): void;
}

export default memo(function ButtonToggle({ labels, onClick }: Props) {
  const [activeLabel, setActiveLabel] = useState<Label | null>(null);

  function handleClick(selectedLabel: Label) {
    const value = activeLabel === selectedLabel ? null : selectedLabel;
    onClick(value);
    setActiveLabel(value);
  }

  return (
    <>
      {labels.map((label: Label) => (
        <button
          key={label}
          onClick={() => handleClick(label)}
          className={clsx("btn-primary", activeLabel === label && "active")}
        >
          {label}
        </button>
      ))}
    </>
  );
});
