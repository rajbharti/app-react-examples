import type { TagType } from "../types";
import Tags from "./Tags";

interface PropsInterface {
  title: string;
  tags: TagType[];
}

export default function Header({ title, tags }: PropsInterface) {
  return (
    <h3>
      {title} <Tags tags={tags} />
    </h3>
  );
}
