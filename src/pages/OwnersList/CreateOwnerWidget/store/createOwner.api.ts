import { apiUrl } from 'server/apiUrl';
import { OWNERS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { OwnerType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

export const createOwnerApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createOwner: build.mutation<void, { data: Partial<OwnerType> }>({
        query: ({ data }) => {
          return {
            url: replaceUrlParams(apiUrl.owners),
            method: 'POST',
            body: data,
          };
        },
        invalidatesTags: () => [{ type: OWNERS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useCreateOwnerMutation } = createOwnerApi;
