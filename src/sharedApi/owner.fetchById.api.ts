import type { OwnerIdType, OwnerType } from 'sharedTypes/owner.types';

import { baseApi } from 'store/baseApi';

import { OWNERS_TAG_TYPE } from './sharedTagTypes';

export const ownerFetchByIdApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchOwnerById: build.query<OwnerType, { ownerId: OwnerIdType }>({
        query: ({ ownerId }) => ({
          url: `/owners/${ownerId}`,
          method: 'GET',
        }),
        providesTags: (_, __, { ownerId }) => [{ type: OWNERS_TAG_TYPE, id: ownerId }],
      }),
    }),
  });

export const { useFetchOwnerByIdQuery } = ownerFetchByIdApi;
