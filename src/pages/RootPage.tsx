import { Outlet } from "react-router-dom";

import { AppSidebar } from "components/AppSidebar";
import { MainContainer } from "components/MainContainer";

export const RootPage = () => {
  return (
    <MainContainer>
      <h1 className="mb-4 text-center text-2xl font-bold">React stack</h1>
      <div className="flex">
        <AppSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </MainContainer>
  );
};
