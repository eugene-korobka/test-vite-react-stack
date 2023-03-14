import { ARTICLES_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import { urlArticleById } from 'sharedApi/urlStrings';
import type { ArticleIdType, ArticleType } from 'sharedTypes/article.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

export const updateArticleApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateArticle: build.mutation<void, { articleId: ArticleIdType; data: Partial<ArticleType> }>({
        query: ({ articleId, data }) => {
          return {
            url: replaceUrlParams(urlArticleById, { articleId }),
            method: 'PATCH',
            body: data,
          };
        },
        invalidatesTags: (_, __, { articleId }) => [{ type: ARTICLES_TAG_TYPE, id: articleId }],
      }),
    }),
  });

export const { useUpdateArticleMutation } = updateArticleApi;
