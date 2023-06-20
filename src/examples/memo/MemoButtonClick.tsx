import { memo, useRef, useState } from "react";
import Example from "src/components/Example";

const ChildComp = memo(function Child({ num }: { num: number }) {
  console.log("Child render");
  return (
    <Example isChild comments="memoized component">
      {num}
    </Example>
  );
});

export default function MemoButtonClick() {
  const [num, setNum] = useState(0);
  const previousNumRef = useRef(0);

  function handleClick() {
    setNum((prevNum: number) => {
      previousNumRef.current = prevNum;
      return Math.floor(Math.random() * 10 + 1);
    });
  }

  return (
    <Example title="Button Click">
      <button onClick={handleClick}>Generate Random Number</button>
      <ChildComp num={num} />
      <pre>
        {previousNumRef.current === num ? (
          <i>Same Number</i>
        ) : (
          <b>New Number</b>
        )}{" "}
        (num: {num}, previousNum: {previousNumRef.current})
      </pre>
    </Example>
  );
}
