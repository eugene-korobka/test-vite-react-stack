import { ARTICLES_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import { urlArticles } from 'sharedApi/urlStrings';
import { ArticleType } from 'sharedTypes/article.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

export const fetchArticlesApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArticles: build.query<ArticleType[], void>({
        query: () => replaceUrlParams(urlArticles),
        providesTags: (result) =>
          result
            ? [
              ...result.map((article) => ({ type: ARTICLES_TAG_TYPE, id: article._id })),
              { type: ARTICLES_TAG_TYPE, id: 'LIST' },
            ]
            : [{ type: ARTICLES_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchArticlesQuery } = fetchArticlesApi;
