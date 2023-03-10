import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ArticleViewPage } from 'pages/ArticlePage/ArticleViewPage';
import { ArticlesListPage } from 'pages/ArticlesList/ArticlesListPage';
import { HomePage } from 'pages/HomePage';
import { OwnersListPage } from 'pages/OwnersList/OwnersListPage';
import { OwnerViewPage } from 'pages/OwnerView/OwnerViewPage';
import { RootPage } from 'pages/RootPage';

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
        path: AppRoutes.articlesList(),
        element: <ArticlesListPage />,
      },
      {
        path: AppRoutes.articleView(),
        element: <ArticleViewPage />,
      },
      {
        path: AppRoutes.ownersList(),
        element: <OwnersListPage />,
      },
      {
        path: AppRoutes.ownerView(),
        element: <OwnerViewPage />,
      },
    ],
  },
]);
