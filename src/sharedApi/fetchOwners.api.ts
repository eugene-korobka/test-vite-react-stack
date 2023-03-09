import { OWNERS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { OwnerType } from 'sharedTypes/owner.types';

import { baseApi } from 'store/baseApi';

export const fetchOwnersApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchOwners: build.query<OwnerType[], void>({
        query: () => '/owners',
        providesTags: (result) =>
          result
            ? [
              ...result.map((item) => ({ type: OWNERS_TAG_TYPE, id: item.id })),
              { type: OWNERS_TAG_TYPE, id: 'LIST' },
            ]
            : [{ type: OWNERS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchOwnersQuery } = fetchOwnersApi;