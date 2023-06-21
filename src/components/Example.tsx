import clsx from "clsx";
import Tags from "./Tags";
import Comments from "./Comments";

interface Props {
  isChild?: boolean;
  hasNestedComp?: boolean;
  title?: string;
  comments?: string;
  children: React.ReactNode;
}

type HeaderProps = Required<Pick<Props, "title">>;

function Header({ title }: HeaderProps) {
  return (
    <h3 className="text-slate-700">
      {title} <Tags />
    </h3>
  );
}
export default function Example({
  isChild = false,
  hasNestedComp = true,
  title,
  comments,
  children,
}: Props) {
  const WithOrWithoutHeading = hasNestedComp ? (
    <h4 className="text-lime-700">
      {isChild ? "Child" : "Parent"}
      {comments && <Comments>{comments}</Comments>}
    </h4>
  ) : (
    comments && (
      <>
        <Comments>{comments}</Comments>
        <br />
      </>
    )
  );

  const RenderParentOrChild = (
    <div
      className={clsx(
        "border border-lime-600 px-2.5 py-2.5",
        isChild ? "m-2.5 bg-white" : "bg-lime-100"
      )}
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
}
