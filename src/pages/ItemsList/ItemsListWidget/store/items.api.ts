import { ItemType } from 'pages/ItemsList/ItemsListWidget/store/types';

import { baseApi } from 'store/baseApi';

const extendedItemsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchItems: build.query<ItemType[], void>({
      query: () => '/items',
    }),
  }),
});

export const { useFetchItemsQuery } = extendedItemsApi;
