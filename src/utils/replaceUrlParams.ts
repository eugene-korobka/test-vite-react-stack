export type UrlParams = Record<string, string | number>;

export function replaceUrlParams(url: string, urlParams?: UrlParams): string {
  if (!url.includes(':') || !urlParams) {
    return url;
  }

  return Object.entries(urlParams).reduce((acc, [paramName, paramValue]) => {
    const regex = new RegExp(`:${paramName}`);

    return acc.replace(regex, encodeURIComponent(paramValue));
  }, url);
};
