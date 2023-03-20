import { apiUrl } from 'server/apiUrl';
import { ARTICLES_AVAILABLE_TAG_TYPE, ARTICLES_BY_OWNER_TAG_TYPE,ARTICLES_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleIdType } from 'sharedTypes/article.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

const removeArticleApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE, ARTICLES_AVAILABLE_TAG_TYPE, ARTICLES_BY_OWNER_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      removeArticle: build.mutation<void, { articleId: ArticleIdType }>({
        query: ({ articleId }) => {
          return ({
            url: replaceUrlParams(apiUrl.articleById, { articleId }),
            method: 'DELETE',
          });
        },
        invalidatesTags: () => [
          { type: ARTICLES_TAG_TYPE, id: 'LIST' },
          { type: ARTICLES_AVAILABLE_TAG_TYPE, id: 'LIST' },
          { type: ARTICLES_BY_OWNER_TAG_TYPE, id: 'LIST' },
        ],
      }),
    }),
  });

export const { useRemoveArticleMutation } = removeArticleApi;
