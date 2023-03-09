import type { ItemType } from 'sharedTypes/item.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';

import { baseApi } from 'store/baseApi';

import { OWNER_ITEMS_TAG_TYPE } from './sharedTagTypes';

export const fetchOwnerItemsApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNER_ITEMS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchOwnerItems: build.query<ItemType[], { ownerId: OwnerIdType }>({
        query: ({ ownerId }) => ({
          url: `/owners/${ownerId}/items`,
          method: 'GET',
        }),
        providesTags: () => [{ type: OWNER_ITEMS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchOwnerItemsQuery } = fetchOwnerItemsApi;
