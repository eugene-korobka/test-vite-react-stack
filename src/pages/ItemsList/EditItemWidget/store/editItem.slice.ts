import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { itemEditApi } from "./items.edit.api";
import { ItemType, ItemTypeId } from "./types";

const initialState: {
  isEditModalOpen: boolean;
  editedItemId: ItemTypeId | null;
  formData: Partial<ItemType>;
  isConfirmCloseModalOpen: boolean;
} = {
  isEditModalOpen: false,
  editedItemId: null,
  formData: {},
  isConfirmCloseModalOpen: false,
};

export const editItemSlice = createSlice({
  name: 'editItem',
  initialState,
  reducers: {
    openEditModal(state, action: PayloadAction<{ itemId: ItemTypeId }>) {
      state.isEditModalOpen = true;
      state.editedItemId = action.payload.itemId;
    },
    closeEditModal(state) {
      state.isEditModalOpen = false;
      state.editedItemId = initialState.editedItemId;
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
      state.editedItemId = initialState.editedItemId;
    },
    closeConfirmCloseModalWithCancel(state) {
      state.isConfirmCloseModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(itemEditApi.endpoints.fetchItemById.matchFulfilled, (draft, action) => {
      draft.formData = action.payload;
    });
  },
});

export const editItemActions = editItemSlice.actions;

export const editItemReducer = editItemSlice.reducer;
