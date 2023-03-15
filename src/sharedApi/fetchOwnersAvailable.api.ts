import { OWNERS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleIdType } from 'sharedTypes/article.types';
import type { OwnerType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { urlOwnersAvailable } from './urlStrings';

export const fetchOwnersAvailableApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchOwnersAvailable: build.query<OwnerType[], { articleId?: ArticleIdType }>({
        query: ({ articleId }) => {
          return ({
            url: replaceUrlParams(urlOwnersAvailable),
            method: 'GET',
            params: { articleId },
          });
        },
        providesTags: () => [{ type: OWNERS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchOwnersAvailableQuery } = fetchOwnersAvailableApi;
