import { memo, forwardRef } from "react";
import clsx from "clsx";
import Tags from "./Tags";
import Comments from "./Comments";
import { ExampleContext } from "../context";
import { useExampleContext } from "src/hooks";

type Ref = HTMLDivElement;

interface Props {
  title?: string;
  comments?: string;
  className?: string;
  hideParentTitle?: boolean;
  showChildLabelling?: boolean;
  children: React.ReactNode;
}

type HeaderProps = Required<Pick<Props, "title">>;

const Header = memo(function Header({ title }: HeaderProps) {
  return (
    <h3>
      {title} <Tags />
    </h3>
  );
});

export default forwardRef<Ref, Props>(function Example(
  {
    title,
    comments,
    className,
    hideParentTitle = false,
    showChildLabelling = false,
    children,
  },
  ref
) {
  const level = useExampleContext();

  const isChild = level > 1;
  const childTitle =
    "Child" +
    (isChild && showChildLabelling
      ? " " + String.fromCharCode(63 + level)
      : "");

  const RenderParentOrChild = (
    <div
      className={clsx(
        "border border-lime-600 px-2.5 py-2.5",
        isChild ? "m-2.5 bg-white" : "bg-lime-100",
        className
      )}
      ref={ref}
    >
      {!hideParentTitle ? (
        <h4 className="mb-2 text-lime-700">
          {isChild ? childTitle : "Parent"}
          {comments && <Comments>{comments}</Comments>}
        </h4>
      ) : (
        comments && (
          <>
            <Comments>{comments}</Comments>
            <br />
          </>
        )
      )}
      {children}
    </div>
  );

  return (
    <ExampleContext.Provider value={level + 1}>
      {!isChild ? (
        <section>
          {title && <Header title={title} />}
          {RenderParentOrChild}
        </section>
      ) : (
        RenderParentOrChild
      )}
    </ExampleContext.Provider>
  );
});
