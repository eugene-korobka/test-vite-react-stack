import { ITEMS_TAG_TYPE } from 'pages/ItemsList/FilteredItemsListWidget/store/items.api';
import { ItemType } from 'pages/ItemsList/FilteredItemsListWidget/store/types';

import { baseApi } from 'store/baseApi';

export const itemRemoveApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ITEMS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      removeItem: build.mutation<void, { itemId: ItemType['id'] }>({
        query: ({ itemId }) => ({
          url: `/items/${itemId}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_, __, { itemId }) => [{ type: ITEMS_TAG_TYPE, id: itemId }],
      }),
    }),
  });


export const { useRemoveItemMutation } = itemRemoveApi;
