import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ItemTypeId } from "./types";

const initialState: {
  isEditModalOpen: boolean;
  currentModalId: ItemTypeId | null;
  isConfirmCloseModalOpen: boolean;
  hasFormChanges: boolean;
} = {
  isEditModalOpen: false,
  currentModalId: null,
  isConfirmCloseModalOpen: false,
  hasFormChanges: false,
};

export const editItemSlice = createSlice({
  name: 'editItem',
  initialState,
  reducers: {
    resetState() {
      return initialState;
    },
    openEditModal(state, action: PayloadAction<{ modalId: ItemTypeId }>) {
      state.isEditModalOpen = true;
      state.currentModalId = action.payload.modalId;
    },
    closeEditModal() {
      return initialState;
    },
    openConfirmCloseModal(state) {
      state.isConfirmCloseModalOpen = true;
    },
    closeConfirmCloseModalWithConfirm() {
      return initialState;
    },
    closeConfirmCloseModalWithCancel(state) {
      state.isConfirmCloseModalOpen = false;
    },
    setHasFormChanges(state, action: PayloadAction<boolean>) {
      state.hasFormChanges = action.payload;
    },
  },
});

const beforeCloseEditModal = () => (dispatch, getState) => {
  const sliceState = getState()[editItemSlice.name];

  const hasFormChanges = sliceState.hasFormChanges;

  if (hasFormChanges) {
    dispatch(editItemSlice.actions.openConfirmCloseModal());
  } else {
    dispatch(editItemSlice.actions.closeEditModal());
  }
};

export const editItemActions = {
  ...editItemSlice.actions,
  beforeCloseEditModal,
};

export const editItemReducer = editItemSlice.reducer;
