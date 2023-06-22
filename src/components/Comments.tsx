import clsx from "clsx";
interface Props {
  noLeftMargin?: boolean;
  children: React.ReactNode;
}

export default function Comments({ noLeftMargin, children }: Props) {
  return (
    <span
      className={clsx(
        "font-normal text-gray-500 before:pr-1 before:content-['//']",
        !noLeftMargin && "ml-2"
      )}
    >
      {children}
    </span>
  );
}
