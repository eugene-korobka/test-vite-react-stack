import { createBrowserRouter, Navigate } from "react-router-dom";

import { HomePage } from "pages/HomePage";
import { ItemViewPage } from "pages/ItemPage/ItemViewPage";
import { ItemsListPage } from "pages/ItemsList/ItemsListPage";
import { RootPage } from "pages/RootPage";

import { AppRoutes } from './routes';

export const appRouter = createBrowserRouter([
  {
    element: <RootPage />,
    children: [
      {
        path: AppRoutes.root(),
        element: <Navigate to={AppRoutes.home()} />,
      },
      {
        path: AppRoutes.home(),
        element: <HomePage />,
      },
      {
        path: AppRoutes.itemsList(),
        element: <ItemsListPage />,
      },
      {
        path: AppRoutes.itemView(),
        element: <ItemViewPage />,
      },
    ],
  },
]);
