import { useState, useTransition } from "react";
import Example from "src/components/Example";

interface TabButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const tabLabels = ["About", "Posts", "Contact Us"] as const;
type TabLabel = (typeof tabLabels)[number];

function AboutContent() {
  return <p>About content</p>;
}

function PostsContent() {
  const items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return <ul className="items">{items}</ul>;
}

function SlowPost({ index }: { index: number }) {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className="item">Post #{index + 1}</li>;
}

function ContactUsContent() {
  return <p>Contact Us content</p>;
}

function TabButton({ children, isActive, onClick }: TabButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => onClick());
  }

  if (isActive) {
    return <b className="mx-1.5">{children}</b>;
  }

  if (isPending) {
    return <b className="mx-1.5 text-gray-400">{children}</b>;
  }

  return <button onClick={handleClick}>{children}</button>;
}

export default function UseTransitionTabs() {
  const [tab, setTab] = useState<TabLabel>("About");
  console.log(tab);

  return (
    <Example hideParentTitle title="Tabs">
      {tabLabels.map((label: TabLabel) => (
        <TabButton
          key={label}
          isActive={tab === label}
          onClick={() => setTab(label)}
        >
          {label}
        </TabButton>
      ))}

      {tab === "About" && <AboutContent />}
      {tab === "Posts" && <PostsContent />}
      {tab === "Contact Us" && <ContactUsContent />}
    </Example>
  );
}
