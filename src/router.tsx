import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "pages/HomePage";
import { ItemViewPage } from "pages/ItemPage/ItemViewPage";
import { ItemsListPage } from "pages/ItemsList/ItemsListPage";
import { RootPage } from "pages/RootPage";

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/items-list',
        element: <ItemsListPage />,
      },
      {
        path: '/items-list/:itemId',
        element: <ItemViewPage />,
      },
    ],
  },
]);
