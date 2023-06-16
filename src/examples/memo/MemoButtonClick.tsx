import { memo, useRef, useState } from "react";
import Header from "src/components/Header";

const ChildComp = memo(function Child({ num }: { num: number }) {
  console.log("Child render");
  return (
    <div className="child-comp">
      <h4>
        Child Comp<span className="comments">memoized component</span>
      </h4>
      {num}
    </div>
  );
});

export default function Parent() {
  const [num, setNum] = useState(0);
  const previousNumRef = useRef(0);

  function handleClick() {
    setNum((prevNum: number) => {
      previousNumRef.current = prevNum;
      return Math.floor(Math.random() * 10 + 1);
    });
  }

  return (
    <section>
      <Header title="memo Example" />
      <div className="parent-comp">
        <h4>Parent Comp</h4>
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
      </div>
    </section>
  );
}
