import { apiUrl } from 'server/apiUrl';
import { ARTICLES_BY_OWNER_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleType } from 'sharedTypes/article.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

export const fetchOwnerArticlesApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_BY_OWNER_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchOwnerArticles: build.query<ArticleType[], { ownerId: OwnerIdType }>({
        query: ({ ownerId }) => {
          return ({
            url: replaceUrlParams(apiUrl.ownerByIdArticles, { ownerId }),
            method: 'GET',
          });
        },
        providesTags: () => [{ type: ARTICLES_BY_OWNER_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchOwnerArticlesQuery } = fetchOwnerArticlesApi;
