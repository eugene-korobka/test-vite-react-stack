import { apiUrl } from 'server/apiUrl';
import { ARTICLES_AVAILABLE_TAG_TYPE,ARTICLES_BY_OWNER_TAG_TYPE, OWNERS_AVAILABLE_TAG_TYPE,OWNERS_BY_ARTICLE_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleIdType } from 'sharedTypes/article.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

export const updateArticleOwnersListApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_BY_ARTICLE_TAG_TYPE, ARTICLES_BY_OWNER_TAG_TYPE, OWNERS_AVAILABLE_TAG_TYPE, ARTICLES_AVAILABLE_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateArticleOwnersList: build.mutation<void, { articleId: ArticleIdType; ownerIds: OwnerIdType[] }>({
        query: ({ articleId, ownerIds }) => {
          return {
            url: replaceUrlParams(apiUrl.articleByIdOwners, { articleId }),
            method: 'PUT',
            body: { ownerIds },
          };
        },
        invalidatesTags: () => [
          { type: OWNERS_BY_ARTICLE_TAG_TYPE, id: 'LIST' },
          { type: OWNERS_AVAILABLE_TAG_TYPE, id: 'LIST' },
          { type: ARTICLES_BY_OWNER_TAG_TYPE, id: 'LIST' },
          { type: ARTICLES_AVAILABLE_TAG_TYPE, id: 'LIST' },
        ],
      }),
    }),
  });

export const { useUpdateArticleOwnersListMutation } = updateArticleOwnersListApi;
