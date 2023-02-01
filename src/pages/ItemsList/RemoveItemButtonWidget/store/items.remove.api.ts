import { ITEMS_TAG_TYPE } from 'pages/ItemsList/FilteredItemsListWidget/store/items.api';
import { ItemType } from 'pages/ItemsList/FilteredItemsListWidget/store/types';

import { baseApi } from 'store/baseApi';

export const itemRemoveApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ITEMS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      removeItem: build.mutation<void, { id: ItemType['id'] }>({
        query: ({ id }) => ({
          url: `/items/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_, __, { id }) => [{ type: ITEMS_TAG_TYPE, id }],
      }),
    }),
  });


export const { useRemoveItemMutation } = itemRemoveApi;
