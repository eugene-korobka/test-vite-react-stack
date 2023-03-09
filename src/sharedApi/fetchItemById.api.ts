import type { ItemIdType, ItemType } from 'sharedTypes/item.types';

import { baseApi } from 'store/baseApi';

import { ITEMS_TAG_TYPE } from './sharedTagTypes';

export const fetchItemByIdApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ITEMS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchItemById: build.query<ItemType, { itemId: ItemIdType }>({
        query: ({ itemId }) => ({
          url: `/items/${itemId}`,
          method: 'GET',
        }),
        providesTags: (_, __, { itemId }) => [{ type: ITEMS_TAG_TYPE, id: itemId }],
      }),
    }),
  });

export const { useFetchItemByIdQuery } = fetchItemByIdApi;
