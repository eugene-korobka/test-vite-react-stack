import type { OwnerIdType, OwnerType } from 'sharedTypes/owner.types';
import { apiUrl } from 'src/@shared/apiUrl';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { OWNERS_TAG_TYPE } from './sharedTagTypes';

const fetchOwnerByIdApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchOwnerById: build.query<OwnerType, { ownerId: OwnerIdType }>({
        query: ({ ownerId }) => {
          return {
            url: replaceUrlParams(apiUrl.ownerById, { ownerId }),
            method: 'GET',
          };
        },
        providesTags: (_, __, { ownerId }) => [{ type: OWNERS_TAG_TYPE, id: ownerId }],
      }),
    }),
  });

export const { useFetchOwnerByIdQuery } = fetchOwnerByIdApi;
