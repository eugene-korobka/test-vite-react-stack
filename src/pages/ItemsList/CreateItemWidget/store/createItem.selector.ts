import { createSelector } from "@reduxjs/toolkit"

import { createItemSlice } from 'pages/ItemsList/CreateItemWidget/store/createItem.slice';

import { selectRootState } from "store/store";

const selectCreateItemDomain = createSelector(selectRootState, (state) => state[createItemSlice.name]);

const selectIsCreateModalOpen = createSelector(selectCreateItemDomain, (state) => state.isCreateModalOpen);

const selectFormData = createSelector(selectCreateItemDomain, (state) => state.formData);

const selectIsConfirmCloseModalOpen = createSelector(selectCreateItemDomain, (state) => state.isConfirmCloseModalOpen);

export const createItemSelectors = {
  selectCreateItemDomain,
  selectIsCreateModalOpen,
  selectFormData,
  selectIsConfirmCloseModalOpen,
};
