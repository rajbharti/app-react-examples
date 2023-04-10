import { useState, useEffect, useRef } from "react";
import { squareCal } from "../../../utils";
import Header from "../../../components/Header";
import ChildComp from "./ChildComp";

export default function MemoEx() {
  const [num, setNum] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget.value;
    setNum(input === "" ? 0 : parseInt(input));
  }

  return (
    <section>
      <Header title="memo Example" />
      <div className="parent-comp">
        <h4>Parent Comp</h4>
        <input
          type="number"
          value={num}
          onChange={handleChange}
          ref={inputRef}
        />
        <span>Square the number: {squareCal(num)}</span>
        <br />
        <ChildComp />
      </div>
    </section>
  );
}
