import { ARTICLES_TAG_TYPE, OWNER_ARTICLES_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleIdType } from 'sharedTypes/article.types';
import { OwnerIdType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { urlOwnerArticles } from './urlStrings';

export const updateOwnerArticlesListApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNER_ARTICLES_TAG_TYPE, ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateOwnerArticlesList: build.mutation<void, { ownerId: OwnerIdType; articleIds: Partial<ArticleIdType>[] }>({
        query: ({ ownerId, articleIds }) => {
          return {
            url: replaceUrlParams(urlOwnerArticles, { ownerId }),
            method: 'PATCH',
            body: { articleIds },
          };
        },
        invalidatesTags: () => [
          { type: OWNER_ARTICLES_TAG_TYPE, id: 'LIST' },
          { type: ARTICLES_TAG_TYPE, id: 'LIST' },
        ],
      }),
    }),
  });

export const { useUpdateOwnerArticlesListMutation } = updateOwnerArticlesListApi;
