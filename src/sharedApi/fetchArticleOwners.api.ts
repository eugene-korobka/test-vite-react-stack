import type { ArticleIdType } from 'sharedTypes/article.types';
import type { OwnerType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { ARTICLE_OWNERS_TAG_TYPE } from './sharedTagTypes';
import { urlArticleOwners } from './urlStrings';

export const fetchArticleOwnersApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLE_OWNERS_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArticleOwners: build.query<OwnerType[], { articleId: ArticleIdType }>({
        query: ({ articleId }) => {
          return ({
            url: replaceUrlParams(urlArticleOwners, { articleId }),
            method: 'GET',
          });
        },
        providesTags: () => [{ type: ARTICLE_OWNERS_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchArticleOwnersQuery } = fetchArticleOwnersApi;
