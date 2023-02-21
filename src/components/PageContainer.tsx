import React from "react";

export function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="max-w-7xl my-0 mx-auto p-6">
      {children}
    </div>
  );
}
