import type { ArticleType } from 'sharedTypes/article.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { OWNER_ARTICLES_TAG_TYPE } from './sharedTagTypes';
import { urlOwnerArticles } from './urlStrings';

export const fetchOwnerArticlesApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNER_ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchOwnerArticles: build.query<ArticleType[], { ownerId: OwnerIdType }>({
        query: ({ ownerId }) => ({
          url: replaceUrlParams(urlOwnerArticles, { ownerId }),
          method: 'GET',
        }),
        providesTags: () => [{ type: OWNER_ARTICLES_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchOwnerArticlesQuery } = fetchOwnerArticlesApi;
