import { useContext, createContext, useState } from "react";
import Example from "src/components/Example";

const CountContext = createContext(0);

interface ChildProps {
  children: React.ReactNode;
}

function CompA({ children }: ChildProps) {
  return <Example showChildLabelling>{children}</Example>;
}

function CompB({ children }: ChildProps) {
  return <Example showChildLabelling>{children}</Example>;
}

function CompC() {
  const count = useContext(CountContext);
  return <Example showChildLabelling>Count: {count}</Example>;
}

export default function UseContextPassingDataDeeply() {
  const [count, setCount] = useState(0);

  return (
    <Example title="Passing data deeply">
      Count: {count} <button onClick={() => setCount(count - 1)}>-</button>{" "}
      <button onClick={() => setCount(count + 1)}>+</button>{" "}
      <button onClick={() => setCount(0)}>Reset</button>
      <CountContext.Provider value={count}>
        <CompA>
          <CompB>
            <CompC />
          </CompB>
        </CompA>
      </CountContext.Provider>
    </Example>
  );
}
