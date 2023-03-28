import { OWNERS_BY_ARTICLE_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleIdType } from 'sharedTypes/article.types';
import type { OwnerType } from 'sharedTypes/owner.types';
import { apiUrl } from 'src/@shared/apiUrl';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

const fetchArticleOwnersApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [OWNERS_BY_ARTICLE_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArticleOwners: build.query<OwnerType[], { articleId: ArticleIdType }>({
        query: ({ articleId }) => {
          return {
            url: replaceUrlParams(apiUrl.articleByIdOwners, { articleId }),
            method: 'GET',
          };
        },
        providesTags: () => [{ type: OWNERS_BY_ARTICLE_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchArticleOwnersQuery } = fetchArticleOwnersApi;
