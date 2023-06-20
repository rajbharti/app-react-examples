import clsx from "clsx";
import Tags from "./Tags";
import Comments from "./Comments";

interface Props {
  isChild?: boolean;
  hasNestedComp?: boolean;
  title?: string;
  comments?: string;
  className?: string;
  children: React.ReactNode;
}

type HeaderProps = Required<Pick<Props, "title">>;

function Header({ title }: HeaderProps) {
  return (
    <h3>
      {title} <Tags />
    </h3>
  );
}
export default function Example({
  isChild = false,
  hasNestedComp = true,
  title,
  comments,
  className,
  children,
}: Props) {
  const RenderOnlyParent = (
    <>
      {comments && (
        <>
          <Comments>{comments}</Comments>
          <br />
        </>
      )}

      {children}
    </>
  );

  const ParentOrChild = (
    <div className={isChild ? "child-comp" : "parent-comp"}>
      <h4>
        {isChild ? "Child" : "Parent"}
        {comments && <Comments>{comments}</Comments>}
      </h4>
      {children}
    </div>
  );

  return isChild ? (
    ParentOrChild
  ) : (
    <section className={clsx(className)}>
      {title && <Header title={title} />}
      {hasNestedComp ? ParentOrChild : RenderOnlyParent}
    </section>
  );
}
