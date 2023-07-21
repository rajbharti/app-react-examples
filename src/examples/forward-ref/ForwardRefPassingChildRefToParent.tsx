import { useRef, forwardRef } from "react";
import Example from "src/components/Example";

type Ref = HTMLInputElement;

const Child = forwardRef<Ref>(function Child(props, ref) {
  return (
    <Example>
      <input type="text" ref={ref} />
    </Example>
  );
});

export default function ForwardRefPassingChildRefToParent() {
  const childInputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    childInputRef.current?.focus();
  }
  return (
    <Example title="Passing Child Ref To Parent">
      <button onClick={handleClick}>Focus child input</button>
      <Child ref={childInputRef} />
    </Example>
  );
}
