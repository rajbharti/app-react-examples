interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main>
      <h1 className="mb-5 text-3xl font-bold">TypeScript React Examples</h1>
      {children}
    </main>
  );
}
