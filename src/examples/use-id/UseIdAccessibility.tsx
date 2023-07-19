import { useId } from "react";
import Example from "src/components/Example";

function PasswordField() {
  const passwordHintId = useId();
  return (
    <div className="mb-4">
      <label>
        Password:
        <input
          type="password"
          aria-describedby={passwordHintId}
          className="ml-2"
        />
      </label>
      <p id={passwordHintId} className="cursor-default text-gray-600">
        The password should contain at least 18 characters
      </p>
    </div>
  );
}

export default function UseIdAccessibility() {
  return (
    <Example hideParentCompLabel title="Accessibility">
      <h4>Choose password</h4>
      <PasswordField />
      <h4>Confirm password</h4>
      <PasswordField />
    </Example>
  );
}
