import { useState, useRef, memo } from "react";
import Example from "src/components/Example";
import { useFocus } from "src/hooks";
import { squareCal, getPrimeNums } from "src/utils";

const ChildComp = memo(function ChildComp() {
  return (
    <Example comments="memoized component">
      <p>Prime numbers from 1 to 10</p>
      {getPrimeNums().join(", ")}
    </Example>
  );
});

export default function MemoInputChange() {
  const [num, setNum] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useFocus(inputRef);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget.value;
    setNum(input === "" ? 0 : parseInt(input));
  }

  return (
    <Example title="Input Change">
      <input type="number" value={num} onChange={handleChange} ref={inputRef} />
      <span>Square the number: {squareCal(num)}</span>
      <ChildComp />
    </Example>
  );
}
