import { useState, useRef, useEffect } from "react";
import Example from "src/components/Example";
import Comments from "src/components/Comments";

export default function UseRefInputFocusButtonClick() {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const countRef = useRef(0);
  const COLORS = ["red", "blue", "green", "orange", "pink", "purple"];

  useEffect(() => {
    setFocus();
  }, []);

  function setFocus() {
    inputRef.current?.focus();
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);
  }

  function handleClick() {
    countRef.current = countRef.current + 1;
    // this value is persisted between renders
    console.log(`Button clicked ${countRef.current} times`);

    if (countRef.current % 2 === 0) {
      const randomIndex = Math.floor(Math.random() * COLORS.length);
      (nameRef.current as HTMLParagraphElement).style.color =
        COLORS[randomIndex];
    }
  }

  return (
    <Example hideParentTitle title="Input Focus and Button Click">
      <Comments noSpacing>
        Display name color will change randomly when &quot;Click me&quot;
        clicked counts are a Even number
      </Comments>
      <br />
      <input
        type="text"
        value={name}
        placeholder="Enter your name"
        ref={inputRef}
        onChange={handleInputChange}
      />
      <p>
        Your Name: <span ref={nameRef}>{name}</span>
      </p>
      <button onClick={setFocus}>Set input focus</button>
      <button onClick={handleClick}>Click me</button>
    </Example>
  );
}
