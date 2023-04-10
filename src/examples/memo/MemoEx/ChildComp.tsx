import { useCallback, memo } from "react";
import { getPrimeNums } from "../../../utils";

export default memo(function ChildComp() {
  const showPrimeNums = useCallback(getPrimeNums, []);

  return (
    <div className="child-comp">
      <h4>
        Child Comp<span className="comments">memoized component</span>
      </h4>
      <p>Prime numbers from 1 to 10</p>
      {showPrimeNums().join(", ")}
    </div>
  );
});
