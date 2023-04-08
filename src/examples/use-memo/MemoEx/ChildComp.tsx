import { useMemo } from "react";
import { getEvenNumbers, getSumOfSquareAndCube } from "./utils";

interface PropsInterface {
  square: number;
  cube: number;
}

export default function ChildComp({ square, cube }: PropsInterface) {
  // now getEvenNumbers() will not be invoked when Parent Component is updated
  const evenNums = useMemo(() => getEvenNumbers(), []);

  // HERE, useMemo() WILL NOT WORK AS THE FOLLOWING VALUES ALWAYS CHANGES
  const sum = getSumOfSquareAndCube(square, cube);

  return (
    <div className="child-comp">
      <h4>Child Comp</h4>
      <p>Even numbers from 1 to 10</p>

      {evenNums.join(", ")}
      <p>Some of Square and Cube</p>
      {sum}
    </div>
  );
}
