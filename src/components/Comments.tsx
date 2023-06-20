interface Props {
  children: React.ReactNode;
}

export default function Comments({ children }: Props) {
  return <span className="comments">{children}</span>;
}
