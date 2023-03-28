import type { ArticleIdType, ArticleType } from 'sharedTypes/article.types';
import { apiUrl } from 'src/@shared/apiUrl';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { ARTICLES_TAG_TYPE } from './sharedTagTypes';

const fetchArticleByIdApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArticleById: build.query<ArticleType, { articleId: ArticleIdType }>({
        query: ({ articleId }) => {
          return {
            url: replaceUrlParams(apiUrl.articleById, { articleId }),
            method: 'GET',
          };
        },
        providesTags: (_, __, { articleId }) => [{ type: ARTICLES_TAG_TYPE, id: articleId }],
      }),
    }),
  });

export const { useFetchArticleByIdQuery } = fetchArticleByIdApi;
