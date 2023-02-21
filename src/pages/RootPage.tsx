import { Link, Outlet } from "react-router-dom";

import { MainContainer } from "components/MainContainer";

export const RootPage = () => {
  return (
    <MainContainer>
      <h1 className="mb-4 text-center text-2xl font-bold">React stack</h1>
      <div className="flex">
        <div className="w-50 sticky top-0 p-6">
          <h3 className="w-full mb-4 text-center">Sidebar</h3>
          <nav>
            <ul className="m-0 p-0 list-none">
              <li>
                <Link to="/home">Home page</Link>
              </li>
              <li>
                <Link to="/items-list">Items list page</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </MainContainer>
  );
};
