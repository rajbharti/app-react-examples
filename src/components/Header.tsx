import Tags from "./Tags";

interface PropsInterface {
  title: string;
}

export default function Header({ title }: PropsInterface) {
  return (
    <h3>
      {title} <Tags />
    </h3>
  );
}
