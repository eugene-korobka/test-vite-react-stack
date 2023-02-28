import React from "react";

export const PageHeader = ({ children }: React.PropsWithChildren) => {
  return (
    <h2 className="mb-4 text-xl">{children}</h2>
  );
};
