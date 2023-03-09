import { ITEMS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ItemType } from 'sharedTypes/item.types';

import { baseApi } from 'store/baseApi';

export const createItemApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ITEMS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createItem: build.mutation<void, { data: Partial<ItemType> }>({
        query: ({ data }) => ({
          url: `/items`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: () => [{ type: ITEMS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useCreateItemMutation } = createItemApi;
