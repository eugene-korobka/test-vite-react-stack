import { createSelector } from "@reduxjs/toolkit"

import { selectRootState, selectSelectorParams } from "store/store";

import { editItemSlice } from "./editItem.slice";

const selectEditItemDomain = createSelector(selectRootState, (state) => state[editItemSlice.name]);

const selectIsEditModalOpen = createSelector(selectEditItemDomain, (state) => state.isEditModalOpen);

const selectCurrentModalId = createSelector(selectEditItemDomain, (state) => state.currentModalId);

const selectIsConfirmCloseModalOpen = createSelector(selectEditItemDomain, (state) => state.isConfirmCloseModalOpen);

const selectIsModalOpenById = createSelector(selectEditItemDomain, selectSelectorParams, (state, itemId) => {
  return Boolean(state.currentModalId && state.currentModalId === itemId && state.isEditModalOpen);
});

export const editItemSelectors = {
  selectEditItemDomain,
  selectIsEditModalOpen,
  selectCurrentModalId,
  selectIsConfirmCloseModalOpen,
  selectIsModalOpenById,
};
