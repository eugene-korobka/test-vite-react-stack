import { apiUrl } from 'server/apiUrl';
import { ARTICLES_AVAILABLE_TAG_TYPE,ARTICLES_BY_OWNER_TAG_TYPE, ARTICLES_TAG_TYPE, OWNERS_AVAILABLE_TAG_TYPE,OWNERS_BY_ARTICLE_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleIdType, ArticleType } from 'sharedTypes/article.types';
import { OwnerIdType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

export const updateArticleApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE, OWNERS_BY_ARTICLE_TAG_TYPE, OWNERS_AVAILABLE_TAG_TYPE, ARTICLES_BY_OWNER_TAG_TYPE, ARTICLES_AVAILABLE_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateArticle: build.mutation<void, { articleId: ArticleIdType; data: Partial<ArticleType> & { ownerIds?: OwnerIdType[] } }>({
        query: ({ articleId, data }) => {
          return {
            url: replaceUrlParams(apiUrl.articleById, { articleId }),
            method: 'PATCH',
            body: data,
          };
        },
        invalidatesTags: (_, __, { articleId }) => [
          { type: ARTICLES_TAG_TYPE, id: articleId },
          { type: OWNERS_BY_ARTICLE_TAG_TYPE, id: 'LIST' },
          { type: OWNERS_AVAILABLE_TAG_TYPE, id: 'LIST' },
          { type: ARTICLES_BY_OWNER_TAG_TYPE, id: 'LIST' },
          { type: ARTICLES_AVAILABLE_TAG_TYPE, id: 'LIST' },
        ],
      }),
    }),
  });

export const { useUpdateArticleMutation } = updateArticleApi;
