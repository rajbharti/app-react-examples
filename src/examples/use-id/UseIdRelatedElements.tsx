import { useId } from "react";
import Example from "src/components/Example";

export default function UseIdRelatedElements() {
  const id = useId();

  return (
    <Example hideParentCompLabel title="Generating keys for related elements">
      <form>
        <label htmlFor={id + "-firstName"} className="mr-2">
          First Name:
        </label>
        <input id={id + "-firstName"} type="text" />
        <hr />
        <label htmlFor={id + "-lastName"} className="mr-2">
          Last Name:
        </label>
        <input id={id + "-lastName"} type="text" />
      </form>
    </Example>
  );
}
