import clsx from "clsx";
interface Props {
  noSpacing?: boolean;
  children: React.ReactNode;
}

export default function Comments({ noSpacing, children }: Props) {
  return (
    <span
      className={clsx(
        "font-normal text-gray-500 before:pr-1 before:content-['//']",
        !noSpacing && "ml-2"
      )}
    >
      {children}
    </span>
  );
}
