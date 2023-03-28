import { ARTICLES_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import { ArticleType } from 'sharedTypes/article.types';
import { apiUrl } from 'src/@shared/apiUrl';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

export const fetchArticlesApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArticles: build.query<ArticleType[], void>({
        query: () => {
          return {
            url: replaceUrlParams(apiUrl.articles),
            method: 'GET',
          };
        },
        providesTags: () => [{ type: ARTICLES_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchArticlesQuery } = fetchArticlesApi;
