import { ITEMS_TAG_TYPE } from 'pages/ItemsList/FilteredItemsListWidget/store/items.api';

import { baseApi } from 'store/baseApi';
import { ItemType } from 'store/types';

export const itemCreateApi = baseApi
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


export const { useCreateItemMutation } = itemCreateApi;
