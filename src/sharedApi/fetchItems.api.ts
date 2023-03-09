import { ITEMS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ItemType } from 'sharedTypes/item.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';

import { baseApi } from 'store/baseApi';

export const fetchItemsForOwnerApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ITEMS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchItemsForOwner: build.query<ItemType[], { ownerId: OwnerIdType }>({
        query: () => '/items',
        transformResponse(items: ItemType[], _, { ownerId }) {
          return items.filter((item) => item.ownerId === null || item.ownerId === ownerId);
        },
        providesTags: (result) =>
          result
            ? [
              ...result.map((item) => ({ type: ITEMS_TAG_TYPE, id: item.id })),
              { type: ITEMS_TAG_TYPE, id: 'LIST' },
            ]
            : [{ type: ITEMS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchItemsForOwnerQuery } = fetchItemsForOwnerApi;
