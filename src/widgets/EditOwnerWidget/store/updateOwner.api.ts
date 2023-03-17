import { apiUrl } from 'server/apiUrl';
import { OWNERS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { OwnerIdType, OwnerType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

export const updateOwnerApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateOwner: build.mutation<void, { ownerId: OwnerIdType; data: Partial<OwnerType> }>({
        query: ({ ownerId, data }) => {
          return {
            url: replaceUrlParams(apiUrl.ownerById, { ownerId }),
            method: 'PATCH',
            body: data,
          };
        },
        invalidatesTags: (_, __, { ownerId }) => [{ type: OWNERS_TAG_TYPE, id: ownerId }],
      }),
    }),
  });

export const { useUpdateOwnerMutation } = updateOwnerApi;
