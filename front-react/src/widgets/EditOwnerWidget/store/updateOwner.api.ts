import { OWNERS_AVAILABLE_TAG_TYPE, OWNERS_BY_ARTICLE_TAG_TYPE, OWNERS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { OwnerIdType, OwnerType } from 'sharedTypes/owner.types';
import { apiUrl } from 'src/@shared/apiUrl';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

const updateOwnerApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE, OWNERS_AVAILABLE_TAG_TYPE, OWNERS_BY_ARTICLE_TAG_TYPE],
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
        invalidatesTags: (_, __, { ownerId }) => [
          { type: OWNERS_TAG_TYPE, id: ownerId },
          { type: OWNERS_AVAILABLE_TAG_TYPE, id: 'LIST' },
          { type: OWNERS_BY_ARTICLE_TAG_TYPE, id: 'LIST' },
        ],
      }),
    }),
  });

export const { useUpdateOwnerMutation } = updateOwnerApi;
