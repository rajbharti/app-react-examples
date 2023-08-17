import { useEffect, useRef, useState } from "react";
import Example from "src/components/Example";

const circleSize = 40;

export default function UseEffectListeningToGlobalEvents() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(event: PointerEvent) {
      // TODO: bug in calculating position when user scroll the window
      setPosition({
        x: event.clientX - (divRef.current?.offsetLeft ?? 0) - circleSize / 2,
        y: event.clientY - (divRef.current?.offsetTop ?? 0) - circleSize / 2,
      });
    }

    divRef.current?.addEventListener("pointermove", handleMove);

    return () => {
      divRef.current?.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <Example
      hideParentTitle
      title="Browser API: add/remove event listener"
      className="relative h-52"
      ref={divRef}
    >
      <div
        className="pointer-events-none absolute rounded-full bg-pink-400 opacity-60"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: circleSize,
          height: circleSize,
        }}
      />
    </Example>
  );
}
