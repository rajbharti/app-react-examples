import { memo, forwardRef } from "react";
import clsx from "clsx";
import Tags from "./Tags";
import Comments from "./Comments";

type Ref = HTMLDivElement;

interface Props {
  isChild?: boolean;
  hasNestedComp?: boolean;
  title?: string;
  comments?: string;
  className?: string;
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
  { isChild, hasNestedComp = true, title, comments, className, children },
  ref
) {
  const WithOrWithoutHeading = hasNestedComp ? (
    <h4 className="text-lime-700">
      {isChild ? "Child" : "Parent"}
      {comments && <Comments>{comments}</Comments>}
    </h4>
  ) : (
    comments && (
      <>
        <Comments noSpacing>{comments}</Comments>
        <br />
      </>
    )
  );

  const RenderParentOrChild = (
    <div
      className={clsx(
        "border border-lime-600 px-2.5 py-2.5",
        isChild ? "m-2.5 bg-white" : "bg-lime-100",
        className
      )}
      ref={ref}
    >
      {WithOrWithoutHeading}
      {children}
    </div>
  );

  return isChild ? (
    RenderParentOrChild
  ) : (
    <section>
      {title && <Header title={title} />}
      {RenderParentOrChild}
    </section>
  );
});
