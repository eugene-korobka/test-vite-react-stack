import { ARTICLES_TAG_TYPE, OWNER_ARTICLES_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleType } from 'sharedTypes/article.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { urlArticleById } from './urlStrings';

export const updateArticlesOwnerApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNER_ARTICLES_TAG_TYPE, ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateArticlesOwner: build.mutation<void, Partial<ArticleType>[]>({
        queryFn: async (args, _, __, baseQuery) => {

          const requests = args.map((article) => {
            return baseQuery({
              url: replaceUrlParams(urlArticleById, { articleId: article._id as string }),
              method: 'PATCH',
              body: { ownerId: article.ownerId },
            });
          });

          await Promise.allSettled(requests);

          return { data: undefined };
        },
        invalidatesTags: () => [{ type: OWNER_ARTICLES_TAG_TYPE, id: 'LIST' }, { type: ARTICLES_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useUpdateArticlesOwnerMutation } = updateArticlesOwnerApi;
