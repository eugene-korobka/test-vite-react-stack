import { OWNERS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { OwnerType } from 'sharedTypes/owner.types';
import { apiUrl } from 'src/@shared/apiUrl';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

const fetchOwnersApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchOwners: build.query<OwnerType[], void>({
        query: () => {
          return {
            url: replaceUrlParams(apiUrl.owners),
            method: 'GET',
          };
        },
        providesTags: () => [{ type: OWNERS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchOwnersQuery } = fetchOwnersApi;
