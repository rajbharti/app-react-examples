import { useState, useEffect, useRef, useMemo } from "react";
import Example from "src/components/Example";
import Comments from "src/components/Comments";
import { squareCal, getEvenNumbers, getSumOfSquareAndCube } from "src/utils";

interface ChildCompProps {
  square: number;
  cube: number;
}

function ChildComp({ square, cube }: ChildCompProps) {
  // now getEvenNumbers() will not be invoked when Parent Component is updated
  const evenNums = useMemo(() => [...getEvenNumbers()], []);

  // HERE, useMemo() WILL NOT WORK AS THE ARGUMENTS ALWAYS CHANGE
  const sum = getSumOfSquareAndCube(square, cube);

  return (
    <Example>
      <p>Even numbers from 1 to 10</p>
      {evenNums.join(", ")} <Comments>memoized value</Comments>
      <hr />
      <p>Some of Square and Cube</p>
      {sum}
    </Example>
  );
}

export default function UseMemoInputChange() {
  const [num, setNum] = useState<number>(0);
  const [cubeResult, setCubeResult] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // now squareCal() only be invoked when setNum() set the state
  // not on also when setCubeResult() set the state
  const squareResult = useMemo(() => squareCal(num), [num]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget.value;
    setNum(input === "" ? 0 : parseInt(input));
  }

  function handleCubeCal() {
    setCubeResult(num ** 3);
  }

  return (
    <Example title="Input Change">
      <input type="number" value={num} onChange={handleChange} ref={inputRef} />
      <span>Square the number: {squareResult}</span>
      <Comments>memoized value</Comments>
      <br />
      <button onClick={handleCubeCal}>Cube the number</button> {cubeResult}
      <ChildComp square={squareResult} cube={cubeResult} />
    </Example>
  );
}
