import type { ArticleType } from 'sharedTypes/article.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';

import { baseApi } from 'store/baseApi';

import { OWNER_ARTICLES_TAG_TYPE } from './sharedTagTypes';

export const fetchOwnerArticlesApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNER_ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchOwnerArticles: build.query<ArticleType[], { ownerId: OwnerIdType }>({
        query: ({ ownerId }) => ({
          url: `/owners/${ownerId}/articles`,
          method: 'GET',
        }),
        providesTags: () => [{ type: OWNER_ARTICLES_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchOwnerArticlesQuery } = fetchOwnerArticlesApi;
