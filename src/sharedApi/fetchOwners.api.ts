import { OWNERS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { OwnerType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { urlOwners } from './urlStrings';

export const fetchOwnersApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchOwners: build.query<OwnerType[], void>({
        query: () => replaceUrlParams(urlOwners),
        providesTags: (result) =>
          result
            ? [
              ...result.map((owner) => ({ type: OWNERS_TAG_TYPE, id: owner._id })),
              { type: OWNERS_TAG_TYPE, id: 'LIST' },
            ]
            : [{ type: OWNERS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchOwnersQuery } = fetchOwnersApi;
