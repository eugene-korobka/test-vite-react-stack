import { ITEMS_TAG_TYPE, OWNER_ITEMS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ItemType } from 'sharedTypes/item.types';

import { baseApi } from 'store/baseApi';

export const itemsUpdateOwnerApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNER_ITEMS_TAG_TYPE, ITEMS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateItemsOwner: build.mutation<void, Partial<ItemType>[]>({
        queryFn: async (args, _, __, baseQuery) => {

          const requests = args.map((item) => {
            return baseQuery({
              url: `/items/${item.id}`,
              method: 'PATCH',
              body: { ownerId: item.ownerId },
            });
          });

          await Promise.allSettled(requests);

          return { data: undefined };
        },
        invalidatesTags: () => [{ type: OWNER_ITEMS_TAG_TYPE, id: 'LIST' }, { type: ITEMS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });


export const { useUpdateItemsOwnerMutation } = itemsUpdateOwnerApi;
