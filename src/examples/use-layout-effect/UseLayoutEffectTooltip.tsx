import { useLayoutEffect, useRef, useState } from "react";
import Example from "src/components/Example";

export default function UseLayoutEffectTooltip() {
  const [isVisibile, setIsVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isVisibile) {
      const { bottom } = (
        btnRef.current as HTMLButtonElement
      ).getBoundingClientRect();
      (tooltipRef.current as HTMLDivElement).style.top = `${bottom}px`;
    }
  }, [isVisibile]);

  function handleClick() {
    setIsVisible(!isVisibile);
  }

  return (
    <Example hideParentTitle title="Tooltip">
      <button ref={btnRef} onClick={handleClick}>
        Toggle Tooltip
      </button>
      <p>Some Other Content</p>
      {isVisibile && (
        <div
          ref={tooltipRef}
          className="absolute border-2 border-purple-800 bg-purple-700 px-2 py-1 text-white"
        >
          Tooltip Content
        </div>
      )}
    </Example>
  );
}
