import { createSelector } from "@reduxjs/toolkit";

import { selectRootState } from "store/store";

import { articlesListFilterSlice } from "./articlesListFilter.slice";

const selectTitleFilterDomain = createSelector(selectRootState, (state) => state[articlesListFilterSlice.name]);

const selectTitleFilter = createSelector(selectTitleFilterDomain, (state) => state.titleFilter);

const selectTitleFilterOptions = createSelector(selectTitleFilterDomain, (state) => state.titleFilterOptions);

export const articlesListFilterSelectors = {
  selectTitleFilter,
  selectTitleFilterOptions,
};
