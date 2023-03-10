import type { OwnerIdType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { OWNERS_TAG_TYPE } from './sharedTagTypes';
import { urlOwnerById } from './urlStrings';

export const removeOwnerApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      removeOwner: build.mutation<void, { ownerId: OwnerIdType }>({
        query: ({ ownerId }) => ({
          url: replaceUrlParams(urlOwnerById, { ownerId }),
          method: 'DELETE',
        }),
        invalidatesTags: () => [{ type: OWNERS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useRemoveOwnerMutation } = removeOwnerApi;
