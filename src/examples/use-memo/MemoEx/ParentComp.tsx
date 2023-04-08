import { useState, useEffect, useRef, useMemo } from "react";
import { squareCal } from "./utils";
import ChildComp from "./ChildComp";

export default function ParentComp() {
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
    <div className="parent-comp">
      <h4>Parent Comp</h4>
      <input type="number" value={num} onChange={handleChange} ref={inputRef} />
      <span>Square the number: {squareResult}</span>
      <br />
      <button onClick={handleCubeCal}>Cube the number</button> {cubeResult}
      <ChildComp square={squareResult} cube={cubeResult} />
    </div>
  );
}
