import { ARTICLES_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleType } from 'sharedTypes/article.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { urlOwnerArticlesAvailable } from './urlStrings';

export const fetchAvailableArticlesByOwnerIdApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchAvailableArticlesByOwnerId: build.query<ArticleType[], { ownerId: OwnerIdType }>({
        query: ({ ownerId }) => {
          return ({
            url: replaceUrlParams(urlOwnerArticlesAvailable, { ownerId }),
            method: 'GET',
          });
        },
        providesTags: () => [{ type: ARTICLES_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchAvailableArticlesByOwnerIdQuery } = fetchAvailableArticlesByOwnerIdApi;
