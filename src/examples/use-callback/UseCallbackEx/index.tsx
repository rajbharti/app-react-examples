import { useState, useEffect, useRef, useCallback } from "react";
import { squareCal, getPrimeNums } from "../../../utils";
import Header from "../../../components/Header";
import ChildComp from "./ChildComp";

export default function UseCallbackEx() {
  const [num, setNum] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget.value;
    setNum(input === "" ? 0 : parseInt(input));
  }
  const showPrimeNums = useCallback(getPrimeNums, []);

  return (
    <section>
      <Header title="useCallback & memo Example" />
      <div className="parent-comp">
        <h4>Parent Comp</h4>
        <span className="comments">
          getPrimeNums cached with useCallback and passed to Child Comp
        </span>
        <br />
        <input
          type="number"
          value={num}
          onChange={handleChange}
          ref={inputRef}
        />
        <span>Square the number: {squareCal(num)}</span>
        <br />
        <ChildComp showPrimeNums={showPrimeNums} />
      </div>
    </section>
  );
}
