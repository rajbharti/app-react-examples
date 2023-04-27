import { useMemo } from "react";
import { getEvenNumbers, getSumOfSquareAndCube } from "src/utils";

interface ChildCompProps {
  square: number;
  cube: number;
}

export default function ChildComp({ square, cube }: ChildCompProps) {
  // now getEvenNumbers() will not be invoked when Parent Component is updated
  const evenNums = useMemo(() => [...getEvenNumbers()], []);

  // HERE, useMemo() WILL NOT WORK AS THE ARGUMENTS ALWAYS CHANGE
  const sum = getSumOfSquareAndCube(square, cube);

  return (
    <div className="child-comp">
      <h4>Child Comp</h4>
      <p>Even numbers from 1 to 10</p>
      {evenNums.join(", ")} <span className="comments">memoized value</span>
      <hr />
      <p>Some of Square and Cube</p>
      {sum}
    </div>
  );
}
