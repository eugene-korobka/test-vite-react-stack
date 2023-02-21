import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { ItemTypeId } from "./types";

const initialState: {
  isConfirmRemoveModalOpen: boolean;
  currentModalId: ItemTypeId | null;
} = {
  isConfirmRemoveModalOpen: false,
  currentModalId: null,
};

export const removeItemSlice = createSlice({
  name: 'removeItem',
  initialState,
  reducers: {
    openConfirmRemoveModal(state, action: PayloadAction<{ modalId: ItemTypeId }>) {
      state.isConfirmRemoveModalOpen = true;
      state.currentModalId = action.payload.modalId;
    },
    closeConfirmRemoveModalWithConfirm() {
      return initialState;
    },
    closeConfirmRemoveModalWithCancel() {
      return initialState;
    },
  },
});

export const removeItemActions = removeItemSlice.actions;

export const removeItemReducer = removeItemSlice.reducer;
