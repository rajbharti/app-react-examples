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
    // following means that (prevActiveLabel === selectedLabel ? null : selectedLabel)
    const value = activeLabel === selectedLabel ? null : selectedLabel;
    onClick(value);
    setActiveLabel(value);
  }

  // TODO: tailwindcss: for hover and active create custom function
  return (
    <>
      {labels.map((label: Label) => (
        <button
          key={label}
          onClick={() => handleClick(label)}
          className={clsx(
            "capitalize hover:border-yellow-700 hover:bg-yellow-300 hover:text-yellow-900 active:border-yellow-800 active:bg-yellow-400 active:text-yellow-950",
            activeLabel === label &&
              "border-yellow-700 bg-yellow-300 text-yellow-900"
          )}
        >
          {label}
        </button>
      ))}
    </>
  );
});
