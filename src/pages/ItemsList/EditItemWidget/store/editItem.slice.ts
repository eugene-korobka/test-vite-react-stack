import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { itemEditApi } from "./items.edit.api";
import { ItemType, ItemTypeId } from "./types";

const initialState: {
  isEditModalOpen: boolean;
  currentModalId: ItemTypeId | null;
  formData: Partial<ItemType>;
  isConfirmCloseModalOpen: boolean;
} = {
  isEditModalOpen: false,
  currentModalId: null,
  formData: {},
  isConfirmCloseModalOpen: false,
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
    closeEditModal(state) {
      state.isEditModalOpen = false;
      state.currentModalId = initialState.currentModalId;
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
      state.isEditModalOpen = false;
      state.currentModalId = initialState.currentModalId;
    },
    closeConfirmCloseModalWithCancel(state) {
      state.isConfirmCloseModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(itemEditApi.endpoints.fetchItemById.matchFulfilled, (draft, action) => {
        draft.formData = action.payload;
      });
  },
});

export const editItemActions = editItemSlice.actions;

export const editItemReducer = editItemSlice.reducer;
