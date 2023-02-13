import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ItemType } from "./types";

const initialState: {
  isCreateModalOpen: boolean;
  formData: Partial<ItemType>;
  isConfirmCloseModalOpen: boolean;
} = {
  isCreateModalOpen: false,
  formData: {},
  isConfirmCloseModalOpen: false,
};

export const createItemSlice = createSlice({
  name: 'createItem',
  initialState,
  reducers: {
    openCreateModal(state) {
      state.isCreateModalOpen = true;
    },
    closeCreateModal(state) {
      state.isCreateModalOpen = false;
    },
    saveFormData(state, action: PayloadAction<{ form: typeof initialState.formData }>) {
      state.formData = action.payload.form;
    },
    clearFormData(state) {
      state.formData = initialState.formData;
    },
    openConfirmCloseModal(state) {
      state.isConfirmCloseModalOpen = true;
    },
    closeConfirmCloseModalWithConfirm(state) {
      state.isConfirmCloseModalOpen = false;
      state.isCreateModalOpen = false;
    },
    closeConfirmCloseModalWithCancel(state) {
      state.isConfirmCloseModalOpen = false;
    },
  },
});

export const createItemActions = createItemSlice.actions;

export const createItemReducer = createItemSlice.reducer;
