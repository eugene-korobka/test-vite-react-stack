import { createSelector } from "@reduxjs/toolkit"

import { RootState } from "store/store";

import { removeItemSlice } from "./removeItem.slice";

const selectRemoveItemDomain = createSelector((state: RootState) => state, (state) => state[removeItemSlice.name]);

const selectIsConfirmRemoveModalOpen = createSelector(selectRemoveItemDomain, (state) => state.isConfirmRemoveModalOpen);

const selectRemovedItemId = createSelector(selectRemoveItemDomain, (state) => state.removedItemId);

export const removeItemSelectors = {
  selectRemoveItemDomain,
  selectIsConfirmRemoveModalOpen,
  selectRemovedItemId,
};
