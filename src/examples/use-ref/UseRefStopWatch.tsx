import { useRef, useState } from "react";
import Example from "src/components/Example";

export default function UseRefStopWatch() {
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);
  const intervalRef = useRef<number | null>(null);

  function handleStart() {
    // following two lines required for running code
    setStartTime(Date.now());
    setNow(Date.now());

    intervalRef.current && clearInterval(intervalRef.current); // required when started again
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100);
  }

  const secondsPassed = (now - startTime) / 1000;

  function handleStop() {
    intervalRef.current && clearInterval(intervalRef.current);
  }

  return (
    <Example hasNestedComp={false} title="Stop Watch">
      <span className="pr-2 text-lg font-bold">{secondsPassed.toFixed(3)}</span>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </Example>
  );
}
