export function MainContainer({ children }: { children?: React.ReactNode }) {
  return (
    <main className="max-w-7xl my-0 mx-auto p-6 text-center">
      {children}
    </main>
  );
}
