import { ARTICLE_OWNERS_TAG_TYPE, OWNER_ARTICLES_TAG_TYPE,OWNERS_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleIdType } from 'sharedTypes/article.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { urlArticleOwners } from './urlStrings';

export const updateArticleOwnersListApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLE_OWNERS_TAG_TYPE, OWNERS_TAG_TYPE, OWNER_ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateArticleOwnersList: build.mutation<void, { articleId: ArticleIdType; ownerIds: OwnerIdType[] }>({
        query: ({ articleId, ownerIds }) => {
          return {
            url: replaceUrlParams(urlArticleOwners, { articleId }),
            method: 'PUT',
            body: { ownerIds },
          };
        },
        invalidatesTags: () => [
          { type: ARTICLE_OWNERS_TAG_TYPE, id: 'LIST' },
          { type: OWNERS_TAG_TYPE, id: 'LIST' },
          { type: OWNER_ARTICLES_TAG_TYPE, id: 'LIST' },
        ],
      }),
    }),
  });

export const { useUpdateArticleOwnersListMutation } = updateArticleOwnersListApi;
