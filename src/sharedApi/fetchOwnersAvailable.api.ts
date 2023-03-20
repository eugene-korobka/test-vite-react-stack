import { apiUrl } from 'server/apiUrl';
import { OWNERS_AVAILABLE_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleIdType } from 'sharedTypes/article.types';
import type { OwnerType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

const fetchOwnersAvailableApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_AVAILABLE_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchOwnersAvailable: build.query<OwnerType[], { articleId?: ArticleIdType }>({
        query: ({ articleId }) => {
          return ({
            url: replaceUrlParams(apiUrl.ownersAvailable),
            method: 'GET',
            params: { articleId },
          });
        },
        providesTags: () => [{ type: OWNERS_AVAILABLE_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchOwnersAvailableQuery } = fetchOwnersAvailableApi;
