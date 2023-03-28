import {
  ARTICLES_AVAILABLE_TAG_TYPE,
  ARTICLES_BY_OWNER_TAG_TYPE,
  OWNERS_AVAILABLE_TAG_TYPE,
  OWNERS_BY_ARTICLE_TAG_TYPE,
} from 'sharedApi/sharedTagTypes';
import type { ArticleIdType } from 'sharedTypes/article.types';
import { OwnerIdType } from 'sharedTypes/owner.types';
import { apiUrl } from 'src/@shared/apiUrl';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

const updateOwnerArticlesListApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [
      ARTICLES_BY_OWNER_TAG_TYPE,
      ARTICLES_AVAILABLE_TAG_TYPE,
      OWNERS_BY_ARTICLE_TAG_TYPE,
      OWNERS_AVAILABLE_TAG_TYPE,
    ],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateOwnerArticlesList: build.mutation<void, { ownerId: OwnerIdType; articleIds: Partial<ArticleIdType>[] }>({
        query: ({ ownerId, articleIds }) => {
          return {
            url: replaceUrlParams(apiUrl.ownerByIdArticles, { ownerId }),
            method: 'PUT',
            body: { articleIds },
          };
        },
        invalidatesTags: () => [
          { type: ARTICLES_BY_OWNER_TAG_TYPE, id: 'LIST' },
          { type: ARTICLES_AVAILABLE_TAG_TYPE, id: 'LIST' },
          { type: OWNERS_BY_ARTICLE_TAG_TYPE, id: 'LIST' },
          { type: OWNERS_AVAILABLE_TAG_TYPE, id: 'LIST' },
        ],
      }),
    }),
  });

export const { useUpdateOwnerArticlesListMutation } = updateOwnerArticlesListApi;
