export const routesPaths = {
  root: '/',
  home: '/home',
  itemsList: '/items',
  itemView: '/items/:itemId',
  ownersList: '/owners',
  ownerView: '/owners/:ownerId',
};

type UrlParams = Record<string, string | number>;

type AppRoutesPath = keyof typeof routesPaths;

type AppRoutesType = Record<AppRoutesPath, (urlParams?: UrlParams) => string>;

function replaceUrlParams(url: string, urlParams?: UrlParams): string {
  if (!url.includes(':') || !urlParams) {
    return url;
  }

  return Object.entries(urlParams).reduce((acc, [paramName, paramValue]) => {
    const regex = new RegExp(`:${paramName}`);

    return acc.replace(regex, encodeURIComponent(paramValue));
  }, url);
};

export const AppRoutes = Object.entries(routesPaths).reduce((acc, [name, path]) => {
  acc[name] = (urlParams?: UrlParams) => replaceUrlParams(path, urlParams);

  return acc;
}, {} as AppRoutesType);
