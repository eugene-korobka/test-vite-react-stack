import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "store/store";

const selectTitleFilterDomain = createSelector(
  (state: RootState) => state,
  (state) => state.itemsListFilter,
);
const selectTitleFilter = createSelector(selectTitleFilterDomain, (state) => state.titleFilter);

export const itemsListFilterSelectors = {
  selectTitleFilter,
};
