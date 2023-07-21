import { useRef } from "react";
import Example from "src/components/Example";

interface ChildProps {
  parentInputRef: React.RefObject<HTMLInputElement>;
}
function Child({ parentInputRef }: ChildProps) {
  function handleClick() {
    parentInputRef.current?.focus();
  }

  return (
    <Example>
      <button onClick={handleClick}>Focus parent input</button>
    </Example>
  );
}
export default function UseRefPassingParentRefToChild() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Example title="Passing Parent Ref To Child">
      <input type="text" ref={inputRef} />
      <Child parentInputRef={inputRef} />
    </Example>
  );
}
