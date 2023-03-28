import React from "react";

export function MainContainer({ children }: { children?: React.ReactNode }) {
  return (
    <main className="w-full m-0 p-0">
      {children}
    </main>
  );
}
