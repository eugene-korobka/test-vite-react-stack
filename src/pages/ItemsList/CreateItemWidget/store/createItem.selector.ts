import { createSelector } from "@reduxjs/toolkit"

import { createItemSlice } from 'pages/ItemsList/CreateItemWidget/store/createItem.slice';

import { RootState } from "store/store";

const selectCreateItemDomain = createSelector((state: RootState) => state, (state) => state[createItemSlice.name]);

const selectIsCreateModalOpen = createSelector(selectCreateItemDomain, (state) => state.isCreateModalOpen);

export const createItemSelectors = {
  selectCreateItemDomain,
  selectIsCreateModalOpen,
};
