import { configureStore } from '@reduxjs/toolkit';
import { editArticleSlice } from 'widgets/EditArticleWidget/store/editArticle.slice';

import { createArticleSlice } from 'pages/ArticlesList/CreateArticleWidget/store/createArticle.slice';
import { articlesListFilterSlice } from 'pages/ArticlesList/FilteredArticlesListWidget/store/articlesListFilter.slice';

import { modalManagerSlice } from 'components/ModalManager/store/modalManager.slice';

import { baseApi } from 'store/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [modalManagerSlice.name]: modalManagerSlice.reducer,
    [articlesListFilterSlice.name]: articlesListFilterSlice.reducer,
    [createArticleSlice.name]: createArticleSlice.reducer,
    [editArticleSlice.name]: editArticleSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export function selectRootState(state: RootState) {
  return state;
}

export function selectSelectorParams(_: RootState, params) {
  return params;
}
