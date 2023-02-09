import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { ItemTypeId } from "./types";

const initialState: {
  isConfirmRemoveModalOpen: boolean;
  removedItemId: ItemTypeId | null;
} = {
  isConfirmRemoveModalOpen: false,
  removedItemId: null,
};

export const removeItemSlice = createSlice({
  name: 'removeItem',
  initialState,
  reducers: {
    openConfirmRemoveModal(state, action: PayloadAction<{ itemId: ItemTypeId }>) {
      state.isConfirmRemoveModalOpen = true;
      state.removedItemId = action.payload.itemId;
    },
    closeConfirmRemoveModal(state) {
      state.isConfirmRemoveModalOpen = false;
      state.removedItemId = initialState.removedItemId;
    },
  },
});

export const removeItemActions = removeItemSlice.actions;

export const removeItemReducer = removeItemSlice.reducer;
