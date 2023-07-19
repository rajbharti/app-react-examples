import { useRef, useState, useEffect } from "react";
import Example from "src/components/Example";

export default function UseRefStopWatch() {
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);
  const [recordedTime, setRecordedTimes] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ulRef?.current as HTMLUListElement;
    if (el.scrollHeight > el.clientHeight) {
      el.scrollTo(0, el.scrollHeight);
    }
  }, [recordedTime]);

  function clearStopWatchInterval() {
    intervalRef.current && clearInterval(intervalRef.current);
  }

  function handleStart() {
    // following two lines required for running code
    setStartTime(Date.now());
    setNow(Date.now());

    setIsStarted(true);

    clearStopWatchInterval(); // required when started again
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100);
  }

  // running code
  const secondsPassed = (now - startTime) / 1000;

  function handleStop() {
    clearStopWatchInterval();
    setRecordedTimes([...recordedTime, Number(secondsPassed.toFixed(3))]);
    setIsStarted(false);
  }

  function handleReset() {
    clearStopWatchInterval();
    setStartTime(0);
    setNow(0);
    setRecordedTimes([]);
    setIsStarted(false);
  }

  return (
    <Example hideParentCompLabel title="Stop Watch">
      <span className="pr-2 text-lg font-bold">
        Elapsed Time: {secondsPassed.toFixed(3)}
      </span>

      <button onClick={handleStart} disabled={isStarted}>
        Start
      </button>
      <button
        onClick={handleStop}
        disabled={!isStarted || secondsPassed === recordedTime.at(-1)}
      >
        Stop
      </button>
      <button
        onClick={handleReset}
        disabled={!isStarted && secondsPassed === 0}
      >
        Reset
      </button>

      <ul className="max-h-253px overflow-y-auto pl-0" ref={ulRef}>
        {recordedTime.map((time, i) => (
          <li key={(i + time).toString()}>{time}</li>
        ))}
      </ul>
    </Example>
  );
}
