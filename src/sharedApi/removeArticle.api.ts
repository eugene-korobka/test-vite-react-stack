import type { ArticleIdType } from 'sharedTypes/article.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { ARTICLES_TAG_TYPE } from './sharedTagTypes';
import { urlArticleById } from './urlStrings';

export const removeArticleApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      removeArticle: build.mutation<void, { articleId: ArticleIdType }>({
        query: ({ articleId }) => ({
          url: replaceUrlParams(urlArticleById, { articleId }),
          method: 'DELETE',
        }),
        invalidatesTags: () => [{ type: ARTICLES_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useRemoveArticleMutation } = removeArticleApi;
