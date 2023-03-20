import { replaceUrlParams, UrlParams } from "src/utils/replaceUrlParams";

const routesPaths = {
  root: '/',
  home: '/home',
  articlesList: '/articles',
  articleView: '/articles/:articleId',
  ownersList: '/owners',
  ownerView: '/owners/:ownerId',
};

type AppRoutesPath = keyof typeof routesPaths;

type AppRoutesType = Record<AppRoutesPath, (urlParams?: UrlParams) => string>;

export const AppRoutes = Object.entries(routesPaths).reduce((acc, [name, path]) => {
  acc[name] = (urlParams?: UrlParams) => replaceUrlParams(path, urlParams);

  return acc;
}, {} as AppRoutesType);
