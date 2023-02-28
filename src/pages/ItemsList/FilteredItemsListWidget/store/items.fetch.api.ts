import { ITEMS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import { ItemType } from 'sharedTypes/item.types';

import { baseApi } from 'store/baseApi';

export const itemsFetchApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ITEMS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchItems: build.query<ItemType[], void>({
        query: () => '/items',
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


export const { useFetchItemsQuery } = itemsFetchApi;
