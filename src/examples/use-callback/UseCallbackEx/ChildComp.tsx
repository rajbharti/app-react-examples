import { memo } from "react";

interface PropsInterface {
  showPrimeNums(): number[];
}

export default memo(function ChildComp({ showPrimeNums }: PropsInterface) {
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
