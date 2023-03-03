import { OWNERS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { OwnerType } from 'sharedTypes/owner.types';

import { baseApi } from 'store/baseApi';

export const itemCreateApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createOwner: build.mutation<void, { data: Partial<OwnerType> }>({
        query: ({ data }) => ({
          url: `/owners`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: () => [{ type: OWNERS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useCreateOwnerMutation } = itemCreateApi;
