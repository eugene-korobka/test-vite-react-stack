import { createSelector } from "@reduxjs/toolkit";

import { selectRootState } from "store/store";

import { itemsListFilterSlice } from "./itemsListFilter.slice";

const selectTitleFilterDomain = createSelector(selectRootState, (state) => state[itemsListFilterSlice.name]);

const selectTitleFilter = createSelector(selectTitleFilterDomain, (state) => state.titleFilter);

const selectTitleFilterOptions = createSelector(selectTitleFilterDomain, (state) => state.titleFilterOptions);

export const itemsListFilterSelectors = {
  selectTitleFilter,
  selectTitleFilterOptions,
};
