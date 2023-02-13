import { createSelector } from "@reduxjs/toolkit"

import { selectRootState } from "store/store";

import { removeItemSlice } from "./removeItem.slice";

const selectRemoveItemDomain = createSelector(selectRootState, (state) => state[removeItemSlice.name]);

const selectIsConfirmRemoveModalOpen = createSelector(selectRemoveItemDomain, (state) => state.isConfirmRemoveModalOpen);

const selectRemovedItemId = createSelector(selectRemoveItemDomain, (state) => state.removedItemId);

export const removeItemSelectors = {
  selectRemoveItemDomain,
  selectIsConfirmRemoveModalOpen,
  selectRemovedItemId,
};
