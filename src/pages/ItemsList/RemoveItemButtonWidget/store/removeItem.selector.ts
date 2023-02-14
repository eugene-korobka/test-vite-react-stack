import { createSelector } from "@reduxjs/toolkit"

import { selectRootState } from "store/store";

import { removeItemSlice } from "./removeItem.slice";

const selectRemoveItemDomain = createSelector(selectRootState, (state) => state[removeItemSlice.name]);

const selectIsConfirmRemoveModalOpen = createSelector(selectRemoveItemDomain, (state) => state.isConfirmRemoveModalOpen);

const selectCurrentModalId = createSelector(selectRemoveItemDomain, (state) => state.currentModalId);

export const removeItemSelectors = {
  selectRemoveItemDomain,
  selectIsConfirmRemoveModalOpen,
  selectCurrentModalId,
};
