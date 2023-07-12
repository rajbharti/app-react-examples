import { useEffect, useRef, useState } from "react";
import Example from "src/components/Example";

export default function UseEffectListeningToGlobalEvents() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(event: PointerEvent) {
      setPosition({ x: event.clientX, y: event.clientY });
    }

    divRef.current?.addEventListener("pointermove", handleMove);

    return () => {
      divRef.current?.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <Example
      hasNestedComp={false}
      title="Browser API: add/remove event listener"
    >
      <div ref={divRef} className="h-52">
        <div
          className="pointer-events-none absolute -left-7 -top-7 h-10 w-10 rounded-full bg-pink-400 opacity-60"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        />
      </div>
    </Example>
  );
}
