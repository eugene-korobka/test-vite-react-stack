import { apiUrl } from 'server/apiUrl';
import { ARTICLES_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleType } from 'sharedTypes/article.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

export const fetchArticlesAvailableApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArticlesAvailable: build.query<ArticleType[], { ownerId?: OwnerIdType }>({
        query: ({ ownerId }) => {
          return ({
            url: replaceUrlParams(apiUrl.articlesAvailable),
            method: 'GET',
            params: { ownerId }
          });
        },
        providesTags: () => [{ type: ARTICLES_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchArticlesAvailableQuery } = fetchArticlesAvailableApi;
