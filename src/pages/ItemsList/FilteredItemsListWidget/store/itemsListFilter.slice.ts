import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { itemsFetchApi } from "pages/ItemsList/FilteredItemsListWidget/store/items.fetch.api";

export const titleFilterInitialValue = 'All';

const initialState: {
  titleFilter: string;
  titleFilterOptions: string[];
} = {
  titleFilter: titleFilterInitialValue,
  titleFilterOptions: [],
};

export const itemsListFilterSlice = createSlice({
  name: 'itemsListFilter',
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
      .addMatcher(itemsFetchApi.endpoints.fetchItems.matchFulfilled, (draft, action) => {
        draft.titleFilterOptions = Array.from(new Set([titleFilterInitialValue, ...action.payload.map((item) => item.title)]));;
      })
      .addMatcher(itemsFetchApi.endpoints.fetchItems.matchFulfilled, (draft, action) => {
        if (draft.titleFilter !== titleFilterInitialValue) {
          const hasCurrent = action.payload.some((item) => item.title === draft.titleFilter);

          if (!hasCurrent) {
            draft.titleFilter = titleFilterInitialValue;
          }
        }
      });
  },
});

export const itemsListFilterActions = itemsListFilterSlice.actions;

export const itemsListFilterReducer = itemsListFilterSlice.reducer;
