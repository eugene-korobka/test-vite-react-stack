import { ITEMS_TAG_TYPE } from 'pages/ItemsList/FilteredItemsListWidget/store/items.api';

import { baseApi } from 'store/baseApi';

import { ItemType, ItemTypeId } from './types';

export const itemEditApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ITEMS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchItemById: build.query<ItemType, { itemId: ItemTypeId }>({
        query: ({ itemId }) => ({
          url: `/items/${itemId}`,
          method: 'GET',
        }),
        providesTags: (_, __, { itemId }) => [{ type: ITEMS_TAG_TYPE, id: itemId }],
      }),
      updateItem: build.mutation<void, { itemId: ItemTypeId; data: Partial<ItemType> }>({
        query: ({ itemId, data }) => ({
          url: `/items/${itemId}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: (_, __, { itemId }) => [{ type: ITEMS_TAG_TYPE, id: itemId }],
      }),
    }),
  });


export const { useFetchItemByIdQuery, useUpdateItemMutation } = itemEditApi;
