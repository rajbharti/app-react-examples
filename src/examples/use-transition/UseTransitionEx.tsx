import { useEffect, useState, useTransition } from "react";
import Header from "src/components/Header";

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
  for (let i = 0; i < 1000; i++) {
    const startTime = performance.now();
    while (performance.now() - startTime < 1) {
      // Do nothing for 1 ms per loop to emulate extremely slow code
    }
  }

  return <p>Post content</p>;
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
    return <b className="tab">{children}</b>;
  }

  if (isPending) {
    return <b className="tab pending">{children}</b>;
  }

  return <button onClick={handleClick}>{children}</button>;
}

export default function UseTransitionEx() {
  const [tab, setTab] = useState<TabLabel>("About");

  return (
    <section>
      <Header title="useTransition Example" />
      <div className="tabs-ex">
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
      </div>
    </section>
  );
}
