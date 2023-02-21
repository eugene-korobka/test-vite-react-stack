import { createSelector } from "@reduxjs/toolkit"

import { selectRootState, selectSelectorParams } from "store/store";

import { removeItemSlice } from "./removeItem.slice";

const selectRemoveItemDomain = createSelector(selectRootState, (state) => state[removeItemSlice.name]);

const selectIsConfirmRemoveModalOpen = createSelector(selectRemoveItemDomain, (state) => state.isConfirmRemoveModalOpen);

const selectCurrentModalId = createSelector(selectRemoveItemDomain, (state) => state.currentModalId);

const selectIsModalOpenById = createSelector(selectRemoveItemDomain, selectSelectorParams, (state, itemId) => {
  return Boolean(state.currentModalId && state.currentModalId === itemId && state.isConfirmRemoveModalOpen);
});

export const removeItemSelectors = {
  selectRemoveItemDomain,
  selectIsConfirmRemoveModalOpen,
  selectCurrentModalId,
  selectIsModalOpenById,
};
