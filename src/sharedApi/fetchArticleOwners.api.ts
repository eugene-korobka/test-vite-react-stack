import { apiUrl } from 'server/apiUrl';
import type { ArticleIdType } from 'sharedTypes/article.types';
import type { OwnerType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { ARTICLE_OWNERS_TAG_TYPE } from './sharedTagTypes';

export const fetchArticleOwnersApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLE_OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArticleOwners: build.query<OwnerType[], { articleId: ArticleIdType }>({
        query: ({ articleId }) => {
          return ({
            url: replaceUrlParams(apiUrl.articleByIdOwners, { articleId }),
            method: 'GET',
          });
        },
        providesTags: () => [{ type: ARTICLE_OWNERS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchArticleOwnersQuery } = fetchArticleOwnersApi;
