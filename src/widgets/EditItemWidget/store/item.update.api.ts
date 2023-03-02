import { ITEMS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import { ItemType, ItemTypeId } from 'sharedTypes/item.types';

import { baseApi } from 'store/baseApi';

export const itemEditApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ITEMS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
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


export const { useUpdateItemMutation } = itemEditApi;
