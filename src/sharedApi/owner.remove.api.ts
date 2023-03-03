import type { OwnerIdType } from 'sharedTypes/owner.types';

import { baseApi } from 'store/baseApi';

import { OWNERS_TAG_TYPE } from './sharedTagTypes';

export const ownerRemoveApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      removeOwner: build.mutation<void, { ownerId: OwnerIdType }>({
        query: ({ ownerId }) => ({
          url: `/owners/${ownerId}`,
          method: 'DELETE',
        }),
        invalidatesTags: () => [{ type: OWNERS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });


export const { useRemoveOwnerMutation } = ownerRemoveApi;
