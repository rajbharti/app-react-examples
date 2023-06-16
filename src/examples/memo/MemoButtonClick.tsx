import { memo, useRef, useState } from "react";
import Header from "src/components/Header";

const ChildComp = memo(function Child({ num }: { num: number }) {
  console.log("Child render");
  return <>{num}</>;
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
      <button onClick={handleClick}>Generate Random Number</button>
      <pre>
        {previousNumRef.current === num ? (
          <i>Same Number</i>
        ) : (
          <b>New Number</b>
        )}{" "}
        : <ChildComp num={num} />
        <br />
        num: {num}, previousNum: {previousNumRef.current}
      </pre>
    </section>
  );
}
