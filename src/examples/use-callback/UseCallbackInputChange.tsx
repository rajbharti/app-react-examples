import { useState, useRef, useCallback, memo } from "react";
import Example from "src/components/Example";
import { useFocus } from "src/hooks";
import { squareCal, getPrimeNums } from "src/utils";

interface ChildCompProps {
  showPrimeNums(): number[];
}
const ChildComp = memo(function ChildComp({ showPrimeNums }: ChildCompProps) {
  return (
    <Example comments="memoized component">
      <p>Prime numbers from 1 to 10</p>
      {showPrimeNums().join(", ")}
    </Example>
  );
});

export default function UseCallbackInputChange() {
  const [num, setNum] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useFocus(inputRef);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget.value;
    setNum(input === "" ? 0 : parseInt(input));
  }
  const showPrimeNums = useCallback(getPrimeNums, []);

  return (
    <Example
      title="Input Change"
      comments="getPrimeNums cached with useCallback and passed to Child Comp"
    >
      <input type="number" value={num} onChange={handleChange} ref={inputRef} />
      <span>Square the number: {squareCal(num)}</span>
      <ChildComp showPrimeNums={showPrimeNums} />
    </Example>
  );
}
