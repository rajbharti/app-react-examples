import { createContext, useContext } from "react";
import clsx from "clsx";
import Example from "src/components/Example";
import Comments from "src/components/Comments";
import { getTitleCase } from "src/utils";

const ThemeContext = createContext("light");

function Buttons() {
  const theme = useContext(ThemeContext);
  let primaryClassName =
    "text-orange-600 bg-white hover:bg-orange-200 border-orange-600";
  let secondaryClassName =
    "text-gray-600 bg-white hover:bg-gray-200 border-gray-600";

  if (theme === "dark") {
    primaryClassName =
      "text-white bg-orange-600 hover:bg-orange-800 border-orange-500";
    secondaryClassName =
      "text-white bg-gray-400 hover:bg-gray-600 border-gray-500";
  }

  return (
    <>
      <Comments noSpacing>&lt;ThemeContext.Provider value={theme}&gt;</Comments>
      <br />
      <b className="mr-2">{getTitleCase(theme)} buttons</b>
      <button
        className={clsx(
          primaryClassName,
          "rounded-full border-2 px-2 font-semibold"
        )}
      >
        Primary
      </button>
      <button
        className={clsx(
          secondaryClassName,
          "rounded-full border-2 px-2 font-semibold"
        )}
      >
        Secondary
      </button>
    </>
  );
}

export default function UseContextOverridingContext() {
  return (
    <Example hideParentCompLabel title="Overriding Context">
      <ThemeContext.Provider value="light">
        <Buttons />
        <hr />
        <ThemeContext.Provider value="dark">
          <Buttons />
        </ThemeContext.Provider>
      </ThemeContext.Provider>
    </Example>
  );
}
