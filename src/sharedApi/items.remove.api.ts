import { ItemTypeId } from 'sharedTypes/item.types';

import { baseApi } from 'store/baseApi';

import { ITEMS_TAG_TYPE } from './sharedTagTypes';

export const itemRemoveApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ITEMS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      removeItem: build.mutation<void, { itemId: ItemTypeId }>({
        query: ({ itemId }) => ({
          url: `/items/${itemId}`,
          method: 'DELETE',
        }),
        invalidatesTags: () => [{ type: ITEMS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });


export const { useRemoveItemMutation } = itemRemoveApi;
