interface Props {
  children: React.ReactNode;
}

export default function Comments({ children }: Props) {
  return (
    <span className="ml-2 font-normal text-gray-500 before:pr-1 before:content-['//']">
      {children}
    </span>
  );
}
