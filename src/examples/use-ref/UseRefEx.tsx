import { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";

export default function UseRefEx() {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0);
  const COLORS = ["red", "blue", "green", "yellow", "pink", "purple"];

  useEffect(() => {
    setFocus();
  }, []);

  function setFocus() {
    inputRef.current?.focus();
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);

    if (countRef.current > 1 && countRef.current % 2 === 0) {
      const randomIndex = Math.floor(Math.random() * COLORS.length);
      (inputRef.current as HTMLInputElement).style.color = COLORS[randomIndex];
    }
  }

  function handleClick() {
    countRef.current = countRef.current + 1;
    // this value is persisted between renders
    console.log(`Button clicked ${countRef.current} times`);
  }

  return (
    <section>
      <Header title="useRef Example" />
      <input
        type="text"
        value={name}
        placeholder="Enter your name"
        ref={inputRef}
        onChange={handleInputChange}
      />
      <p>Your Name: {name}</p>
      <button onClick={setFocus}>Set input Focus</button>
      <br />
      <button onClick={handleClick}>Click me</button> for random input color
      while typing when number of clicks are a Even number
    </section>
  );
}
