import { apiUrl } from 'server/apiUrl';
import { ARTICLES_AVAILABLE_TAG_TYPE, ARTICLES_BY_OWNER_TAG_TYPE,ARTICLES_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleType } from 'sharedTypes/article.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

export const createArticleApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE, ARTICLES_AVAILABLE_TAG_TYPE, ARTICLES_BY_OWNER_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createArticle: build.mutation<void, { data: Partial<ArticleType> & { ownerIds?: OwnerIdType[] } }>({
        query: ({ data }) => {
          return {
            url: replaceUrlParams(apiUrl.articles),
            method: 'POST',
            body: data,
          };
        },
        invalidatesTags: () => [
          { type: ARTICLES_TAG_TYPE, id: 'LIST' },
          { type: ARTICLES_AVAILABLE_TAG_TYPE, id: 'LIST' },
          { type: ARTICLES_BY_OWNER_TAG_TYPE, id: 'LIST' },
        ],
      }),
    }),
  });

export const { useCreateArticleMutation } = createArticleApi;
