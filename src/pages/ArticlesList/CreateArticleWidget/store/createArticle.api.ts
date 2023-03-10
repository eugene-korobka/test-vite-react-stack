import { ARTICLES_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import { urlArticles } from 'sharedApi/urlStrings';
import type { ArticleType } from 'sharedTypes/article.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

export const createArticleApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createArticle: build.mutation<void, { data: Partial<ArticleType> }>({
        query: ({ data }) => ({
          url: replaceUrlParams(urlArticles),
          method: 'POST',
          body: data,
        }),
        invalidatesTags: () => [{ type: ARTICLES_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useCreateArticleMutation } = createArticleApi;
