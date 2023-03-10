import { ARTICLES_TAG_TYPE } from 'sharedApi/sharedTagTypes';
import type { ArticleType } from 'sharedTypes/article.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { replaceUrlParams } from 'src/utils/replaceUrlParams';

import { baseApi } from 'store/baseApi';

import { urlArticles } from './urlStrings';

export const fetchArticlesForOwnerApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [ARTICLES_TAG_TYPE],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArticlesForOwner: build.query<ArticleType[], { ownerId: OwnerIdType }>({
        query: () => replaceUrlParams(urlArticles),
        transformResponse(articles: ArticleType[], _, { ownerId }) {
          return articles.filter((article) => article.ownerId === '' || article.ownerId === ownerId);
        },
        providesTags: (result) =>
          result
            ? [
              ...result.map((article) => ({ type: ARTICLES_TAG_TYPE, id: article._id })),
              { type: ARTICLES_TAG_TYPE, id: 'LIST' },
            ]
            : [{ type: ARTICLES_TAG_TYPE, id: 'LIST' }],
      }),
    }),
  });

export const { useFetchArticlesForOwnerQuery } = fetchArticlesForOwnerApi;
