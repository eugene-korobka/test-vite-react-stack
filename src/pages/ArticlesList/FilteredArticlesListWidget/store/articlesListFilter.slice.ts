import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchArticlesApi } from "./fetchArticles.api";

export const titleFilterInitialValue = 'All';

const initialState: {
  titleFilter: string;
  titleFilterOptions: string[];
} = {
  titleFilter: titleFilterInitialValue,
  titleFilterOptions: [],
};

export const articlesListFilterSlice = createSlice({
  name: 'articlesListFilter',
  initialState,
  reducers: {
    setTitleFilter(state, action: PayloadAction<string>) {
      state.titleFilter = action.payload;
    },
    resetTitleFilter(state) {
      state.titleFilter = titleFilterInitialValue;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(fetchArticlesApi.endpoints.fetchArticles.matchFulfilled, (draft, action) => {
        draft.titleFilterOptions = Array.from(new Set([titleFilterInitialValue, ...action.payload.map((article) => article.title)]));;
      })
      .addMatcher(fetchArticlesApi.endpoints.fetchArticles.matchFulfilled, (draft, action) => {
        if (draft.titleFilter !== titleFilterInitialValue) {
          const hasCurrent = action.payload.some((article) => article.title === draft.titleFilter);

          if (!hasCurrent) {
            draft.titleFilter = titleFilterInitialValue;
          }
        }
      });
  },
});

export const articlesListFilterActions = articlesListFilterSlice.actions;

export const articlesListFilterReducer = articlesListFilterSlice.reducer;
